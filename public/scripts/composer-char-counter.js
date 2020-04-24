$(document).ready(function() {
  /*
  This is a helper function that updates every time JQuery detects the user lets go of a key in our html form text input, which then checks the body length and gets the difference between it and our arbitrary character limit of 140; which it then uses to refresh our html element with the "counter" class to the current value, and finally it then checks whether or not to apply the "error" class which is defined in our .css
  */
  $("#tweet-text").on("keyup", function() {
    let content = $(this).val();
    let charCount = content.length;
    let remainingChars = 140 - charCount;
    $(".counter").empty().html(remainingChars);
    if (remainingChars >= 0) {
      $(".counter").removeClass("redtext");
    }
    if (remainingChars < 0) {
      $(".counter").addClass("redtext");
    }
  })
});