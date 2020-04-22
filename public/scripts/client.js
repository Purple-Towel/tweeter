/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];  

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

  renderTweets(data);

});