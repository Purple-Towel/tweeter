/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  // Takes in a tweet object;
  const createTweetElement = function(tweetObj) {
    // Object notation shorthand, to prevent self repitition such as tweetObj.user.avatars and tweetObj.content.text
    let { created_at, user, content } = tweetObj;
    let { avatars, name, handle } = user;
    let { text } = content;
    
    // Sanitizer function to render any potential malicious code attacks via our tweet text harmless
    const sanitzer = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // Template string to construct our html to return to the DOM
    let $tweetHTML =
      `
      <article>
        <header>
          <span class="profile">
            <img src="${avatars}">
          </span>
          <span class="username">
            ${name}
          </span>
          <span class="text-to-hide">
            ${handle}
          </span>
        </header>
          <p class="tweet-content">${sanitzer(text)}</p>
        <footer>
          <span class="time-posted">
            ${new Date(created_at).toDateString()}
          </span>
          <span class="button-group"> 
          <i class="fa fa-heart-o" aria-hidden="true"></i>
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          </span>
          </footer>
      </article> 
    `;
    return $tweetHTML;
  };

  // Takes in an array of tweet objects and creates the html for them, then prepends them to our html element with the tweets-container class
  const renderTweets = function(tweetsArr) {
    for (let tweet of tweetsArr) {
      let $tweetToPrepend = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetToPrepend);
    }
  };

  // Our Ajax function for retrieving our tweets from our database; first it clears the tweets-container and then calls renderTweets on the data it fetches with our GET request
  const fetchTweets = function() {
    $('#tweets-container').empty();
    $.ajax("/tweets/", { method: "GET" })
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };

  // We call this function once on page load and every time we hit submit
  fetchTweets();

  /*
  Listens for a submit event on our element with the sendtweet id, removes any messages inside the error element and the show-error class that our css handles rendering for; then checks the content for either of our two validation conditions and then prevents the submission from going through and passes an error message to our error element and adds the show-error class and plays an animation. If the content passes the validation, it instead does an Ajax post, then clears the text input and counter elements and refreshes the tweets on the page.
  */
  $("#sendtweet").submit(function(event) {
    event.preventDefault();
    $(".error").empty().removeClass("show-error");
    let content = $("#tweet-text").val();
    if (content === "") {
      $(".error").empty().html("Your content is empty!").addClass("show-error").slideDown(750);
    }
    if (content.length > 140) {
      $(".error").empty().html("Your content is too long!").addClass("show-error").slideDown(750);
    }
    if (content !== "" && content.length <= 140) {
      let serializedData = $(this).serialize();
      $.ajax("/tweets/", { method: "POST", data: serializedData });
      $("#tweet-text").val('');
      $(".counter").empty().html(140);
      fetchTweets();
    }
  });

  // Toggles visibility of our compose tweet element and also focuses on the text input of said element
  $(".compose-tweet").click(function(event) {
    $(".new-tweet").slideToggle();
    $(".new-tweet").find("textarea").focus();
  });
});