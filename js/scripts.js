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

function Address(street, city, state, type) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.types = type;
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

function addAddress() {

  $("#new-addresses").append('<div class ="new-address separator"></div>' +
                             '<div class="address new-address">' +
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
                               '<div class="address-type">' +
                               '<label class="radio-inline">' +
                                '<input type="radio" value="home"> Home Address' +
                               '</label>' +
                               '<label class="radio-inline">' +
                                '<input type="radio" value="work"> Work Address' +
                               '</label>'+
                               '</div>' +
                              '</div>'
                             )
};


// user interface logic

$(document).ready(function() {

  $("#add-address").click(function() {
    addAddress();
  });


  $("form#new-contact").submit(function(event) {

      event.preventDefault();
      var inputtedFirstName = $("input#new-first-name").val();
      var inputtedLastName = $("input#new-last-name").val();
      var inputtedEmail = $("input#new-email").val();
      var inputtedPhone = $("input#new-phone").val();
      var inputtedPicture = $("input#new-picture").val();

      var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedEmail, inputtedPhone, inputtedPicture);

      $(".address").each(function() {

        var inputtedStreet = $(this).find("input.new-street").val();
        var inputtedCity = $(this).find("input.new-city").val();
        var inputtedState = $(this).find("input.new-state").val();
        var inputtedAddressType = $(this).find("input:radio:checked").val();
        var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedAddressType);
        newContact.addresses.push(newAddress);
      });

      $(".address-book").show();

      console.log(newContact.addresses);

      $("dl#contacts").append("<dt><img src='" + newContact.picture + "' class='img-responsive img-icon img-circle'></dt><dd><span class='contact'>" + newContact.fullName() + "</span></dd>");

      $(".contact").last().click(function() {
        $(".picture").empty();
        $("#addresses").empty();
        $("#show-contact").show();
        $("#show-contact h2").text(newContact.fullName());
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);
        $(".email").text(newContact.email);
        $(".phone").text(newContact.phone);
        $("dl#addresses").text("");
        newContact.addresses.forEach(function(address) {
          if (address.types === "work") {
          $("dl#addresses").append("<dt><span class='glyphicon glyphicon-briefcase' aria-hidden='true'></span></dt><dd>" + address.street + ", " + address.city + " " + address.state + " " + "</dd>");
          } else {
          $("dl#addresses").append("<dt><span class='glyphicon glyphicon-home' aria-hidden='true'></span></dt><dd>" + address.street + ", " + address.city + " " + address.state + "</dd>");
          }
        });

        $(".picture").append("<img src='" + newContact.picture + "' class='img-responsive' />");

      });

      resetFields();
      $(".new-address").not(".main-address").hide();

    });
  });
