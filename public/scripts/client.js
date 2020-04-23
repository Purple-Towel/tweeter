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
            buttons go here
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
    let content = $("#tweet-text").val();
    if (content === "") {
      alert("Empty message!");
    };
    if (content.length > 140) {
      alert("Too long!");
    };
    if (content !== "" && content.length <= 140) {
    let serializedData = $(this).serialize();
    $.ajax("/tweets/", { method: "POST", data: serializedData });
    fetchTweets();
    };
  });

});