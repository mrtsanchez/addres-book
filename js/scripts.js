// business Logic

function Contact(first, last, email, phone, picture) {
  this.firstName = first;
  this.lastName = last;
  this.email = email;
  this.phone = phone;
  this.picture = picture;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}


// user interface logic

$(document).ready(function() {

  $("form#new-contact").submit(function(event) {
      event.preventDefault();

      var inputtedFirstName = $("input#new-first-name").val();
      var inputtedLastName = $("input#new-last-name").val();
      var inputtedEmail = $("input#new-email").val();
      var inputtedPhone = $("input#new-phone").val();
      var inputtedPicture = $("input#new-picture").val();


      var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedEmail, inputtedPhone, inputtedPicture);

      $(".address-book").show();

      $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

      $(".contact").last().click(function() {
        $(".picture").empty();
        $("#show-contact").show();
        $("#show-contact h2").text(newContact.fullName());
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);
        $(".email").text(newContact.email);
        $(".phone").text(newContact.phone);
        $(".picture").append("<img src='" + newContact.picture + "' class='img-responsive' />");
      });

      $("input#new-first-name").val("");
      $("input#new-last-name").val("");
      $("input#new-email").val("");
      $("input#new-phone").val("");
      $("input#new-picture").val("");

    });
  });
