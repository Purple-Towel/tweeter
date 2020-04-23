$(document).ready(function() {
  // --- our code goes here ---
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