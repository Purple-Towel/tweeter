/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweetObj) {
    let { created_at, user, content } = tweetObj
    let { avatars, name, handle } = user;
    let { text } = content;

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
          <p class="tweet-content">${text}</p>
        <footer>
          <span class="time-posted">
            ${new Date(created_at).toDateString()}
          </span>
          <span class="button-group"> 
            buttons go here
          </span>
          </footer>
      </article> 
    `;
    return $tweetHTML;
  };

  const renderTweets = function(tweetsArr) {
    for (let tweet of tweetsArr) {
      let $tweetToAppend = createTweetElement(tweet);
      $('#tweets-container').append($tweetToAppend);
    }
  };

  const fetchTweets = function() {
    $.ajax("/tweets/", {method: "GET"})
    .then(function(tweets) {
      renderTweets(tweets);
    });
  }

  fetchTweets();

  $( "#sendtweet" ).submit(function( event ) {
    event.preventDefault();
    let serializedData = $(this).serialize();
    $.ajax("/tweets/", { method: "POST", data: serializedData });
  });

});