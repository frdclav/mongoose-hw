// Whenever someone clicks a img tag - img tag will show the comment post form as well as any past comments/notes attached to the article.
$(document).on("click", "img", function () {
  // first check that the comments aren't already open for this article
  if (!($(this).attr('comment-state') === 'open')) {

    // change the state to open
    $(this).attr('comment-state', 'open');

    // save the ids and the div for later use
    var thisId = $(this).attr("data-id");
    var thisDiv = $(`#${thisId}`);

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function (data) {

        var noteDivCard = $("<div>").addClass('card rounded-0').attr('id', `comment-${thisId}`);
        var noteDivCardBody = $("<div>").addClass('card-body');
        var commentForm = $("<form>");
        var commentTitleFormGroup = $("<div class='form-group' id='commentTitle'>");
        var commentBodyFormGroup = $("<div class='form-group' id='commentBody'>");
        var closeBtn = $(`<button class='btn btn-light  rounded-0 close' id='${thisId}'>`).append(`x`);
        var saveNoteBtn = $("<button class='btn btn-light  rounded-0 savenote' >").text('POST!');
        // add id to saveNoteBtn
        saveNoteBtn.attr('data-id', data[0]._id);
        // add html for form -- why did i do this as a string? i don't know, can be cleaned up
        commentTitleFormGroup.html(`
<label for="titleinput"> Post a comment.</label>
<input type="text" class="form-control" id = 'titleinput' placeholder="Comment Title">`);
        commentBodyFormGroup.html(`
<input type="textarea" class="form-control" id = 'bodyinput' placeholder="Comment Body">`);

        // append commentForm things
        commentForm.append(commentTitleFormGroup);
        commentForm.append(commentBodyFormGroup);
        commentForm.append(saveNoteBtn);
        // append everything else
        thisDiv.append(noteDivCard);
        noteDivCard.append(noteDivCardBody);
        noteDivCardBody.prepend(closeBtn)
        noteDivCardBody.append(commentForm);


        // If there's a note in the article
        if (data[0].note) {

          var arr = data[0].note
          arr.forEach(element => {
            var pastComments = $("<div class='m-4'>")
            var pastCommentsTitle = $("<h6>").text(`${element.title}`);
            var pastCommentsBody = $("<p>").text(`${element.body}`);
            pastComments.append($("<hr>"), pastCommentsTitle, pastCommentsBody, $("<hr>"))
            noteDivCardBody.append(pastComments)
          });

        }
      });

  }

});

// close for comments:
$(document).on("click", ".close", function () {
  var divToClose = $(`#comment-${$(this).attr('id')}`)
  $(`#${$(this).attr('id')}-img`).attr('comment-state', 'closed')
  divToClose.empty();
  divToClose.remove();
});

// click for scrape:
$(document).on("click", "#scrape", function () {
  $.ajax({
    method: "Get",
    url: "/scrape"

  })
    .then(function (data) {
      // Log the response
      console.log(data);
      // refresh
      window.location.reload()
    });
});

// When you click the savenote button
$(document).on("click", ".savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId, $(this).attr("data-id"));

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
    });

  // Also, remove the values entered in the input and textarea for note entry -- needs to be fixed, would mess with all open comment forms -- but whos commenting on multiple articles at the same time? :shrug:
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
