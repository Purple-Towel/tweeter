/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const createTweetElement = function (tweetObj) {
    let { created_at, user, content } = tweetObj
    let { avatars, name, handle } = user;
    let { text } = content;

    const sanitzer = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

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

  const renderTweets = function (tweetsArr) {
    for (let tweet of tweetsArr) {
      let $tweetToAppend = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetToAppend);
    }
  };

  const fetchTweets = function () {
    $('#tweets-container').empty();
    $.ajax("/tweets/", { method: "GET" })
      .then(function (tweets) {
        renderTweets(tweets);
      });
  }

  fetchTweets();

  $("#sendtweet").submit(function (event) {
    event.preventDefault();
    $(".error").empty().removeClass("show-error")
    let content = $("#tweet-text").val();
    if (content === "") {
      $(".error").empty().html("Your content is empty!").addClass("show-error").slideDown(750);
    };
    if (content.length > 140) {
      $(".error").empty().html("Your content is too long!").addClass("show-error").slideDown(750);
    };
    if (content !== "" && content.length <= 140) {
      let serializedData = $(this).serialize();
      $.ajax("/tweets/", { method: "POST", data: serializedData });
      $("#tweet-text").val('');
      $(".counter").empty().html(140);
      fetchTweets();
    };
  });

  $(".compose-tweet").click(function (event) {
    $(".new-tweet").slideToggle();
    $(".new-tweet").find("textarea").focus();
  });
});