$(document).ready(function () {
  // Typing Animation
  (function ($) {
      $.fn.writeText = function (content) {
          var contentArray = content.split(""),
              current = 0,
              elem = this;
          var interval = setInterval(function () {
              if (current < contentArray.length) {
                  elem.text(elem.text() + contentArray[current++]);
              } else {
                  clearInterval(interval); // Stop interval when done
              }
          }, 80);
      };
      
  })(jQuery);

  $("#holder").writeText("WEB DESIGNER + DESENVOLVEDOR MOBILE");

  // Initialize WOW.js
  new WOW().init();

  // Side Navigation Animation
  $(".fa-bars").click(function () {
      $(".nav-screen").animate({ right: "0px" }, 200);
      $("body").animate({ right: "285px" }, 200);
  });

  $(".fa-times, .nav-links a").click(function () {
      $(".nav-screen").animate({ right: "-285px" }, 200);
      $("body").animate({ right: "0px" }, 200);
  });

  // Fullpage Initialization
  $("#fullpage").fullpage({
      scrollBar: true,
      responsiveWidth: 400,
      navigation: true,
      navigationTooltips: ["home", "about", "portfolio", "contact", "connect"],
      anchors: ["home", "about", "portfolio", "contact", "connect"],
      menu: "#myMenu",
      fitToSection: false,

      afterLoad: function (anchorLink, index) {
          if (index === 1) {
              $(".fa-chevron-down").css("opacity", "1");
              $(".header-links a").css("color", "white");
              $(".header-links").css("background-color", "transparent");
          } else {
              $(".header-links a").css("color", "black");
              $(".header-links").css("background-color", "white");
          }
          if (index === 2) {
              $(".skillbar").each(function () {
                  $(this).find(".skillbar-bar").animate(
                      { width: $(this).attr("data-percent") },
                      2500
                  );
              });
          }
      }
  });

  // Section Navigation
  $("#moveDown").click(() => $.fn.fullpage.moveSectionDown());
  $("#skills").click(() => $.fn.fullpage.moveTo(2));
  $("#projects").click(() => $.fn.fullpage.moveTo(3));
  $("#contact").click(() => $.fn.fullpage.moveTo(4));

  // Smooth Scrolling
  $("a[href*=\\#]:not([href=\\#])").click(function () {
      if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
          if (target.length) {
              $("html,body").animate({ scrollTop: target.offset().top }, 700);
              return false;
          }
      }
  });

  // AJAX Form Submission
  const form = $("#ajax-contact");
  const formMessages = $("#form-messages");

  form.submit(function (e) {
      e.preventDefault();
      const formData = form.serialize();

      $.ajax({
          type: "POST",
          url: form.attr("action"),
          data: formData
      })
      .done((response) => {
          formMessages.removeClass("error").addClass("success").text(response);
          form.find("input, textarea").val("");
      })
      .fail((data) => {
          formMessages.removeClass("success").addClass("error");
          formMessages.text(data.responseText || "Oops! An error occurred and your message could not be sent.");
      });
  });
});
