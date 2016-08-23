// business Logic

function Contact(first, last, email, phone, picture) {
  this.firstName = first;
  this.lastName = last;
  this.email = email;
  this.phone = phone;
  this.picture = picture;
  this.addresses = [];
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
};

function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-email").val("");
  $("input#new-phone").val("");
  $("input#new-picture").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
};

// user interface logic

$(document).ready(function() {

  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });

  $("form#new-contact").submit(function(event) {
      event.preventDefault();

      var inputtedFirstName = $("input#new-first-name").val();
      var inputtedLastName = $("input#new-last-name").val();
      var inputtedEmail = $("input#new-email").val();
      var inputtedPhone = $("input#new-phone").val();
      var inputtedPicture = $("input#new-picture").val();


      var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedEmail, inputtedPhone, inputtedPicture);

      $(".new-address").each(function() {
        var inputtedStreet = $(this).find("input.new-street").val();
        var inputtedCity = $(this).find("input.new-city").val();
        var inputtedState = $(this).find("input.new-state").val();
        var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
        newContact.addresses.push(newAddress);
      });

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
        $("ul#addresses").text("");
        newContact.addresses.forEach(function(address) {
          $("ul#addresses").append("<li>" + address.street + ", " + address.city + " " + address.state + "</li>");
        });
        $(".picture").append("<img src='" + newContact.picture + "' class='img-responsive' />");
      });

      resetFields();

    });
  });
