(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    FormHandler.prototype.addSubmitHandler = function (fn, page) {
      console.log('Setting submit handler for form');
      this.$formElement.on('submit', function (event) {
        event.preventDefault();

        var data = {
          coffee: this.elements.coffee.value,
          email: this.elements.emailAddress.value,
          size: this.elements.size.value,
          flavor: this.elements.flavor.value,
          strength: this.elements.strength.value
        };

        var baseModal = document.querySelector('.modal');
                
        if (baseModal) {
            var modal = $('#ex1');
            
            var thank = 'Thank you for your order';
            if (data['title']) {
                thank += ' ' + data['title'];
            }

            if (data['username']) {
                thank += ' ' + data['username'];
            }

            modal.html('<p>'+thank+'</p><a href="#" rel="modal:close">Close</a>');
            modal.show();

            baseModal.addEventListener('click', function () {
                modal.hide();
            });
        }

        console.log(data);
        fn(data);
        this.reset();
        this.elements[0].focus();
      });
    };
  }
  FormHandler.prototype.addInputHandler = function (fn) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function (event) {
      var emailAddress = event.target.value;
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        event.target.setCustomValidity(emailAddress + ' is not an authorized email address!');
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);