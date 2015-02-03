(function() {
  $(function() {
    var bindEvents, elementVisibleBottom, hide, hover, position, preventClicksToParent, show;
    bindEvents = function() {
      $(document).on("mouseenter mouseleave", "[data-tooltip]", hover);
      return $("[data-tooltip] .tltp").on("click", preventClicksToParent);
    };
    preventClicksToParent = function(event) {
      event.preventDefault();
      return event.stopPropagation();
    };
    hover = function(event) {
      var $hoveredElement, $tooltip;
      $hoveredElement = $(this);
      $tooltip = $hoveredElement.find(".tooltip");
      clearTimeout($tooltip.attr("data-tooltip-content-timeout"));
      if (event.type === "mouseenter") {
        if ($tooltip.text() !== "") {
          return show($tooltip);
        }
      } else {
        return hide($tooltip);
      }
    };
    position = function($tooltip) {
      return $tooltip.toggleClass("top", !elementVisibleBottom($tooltip));
    };
    show = function($tooltip) {
      return $tooltip.attr("data-tooltip-content-timeout", setTimeout(function() {
        $tooltip.addClass("show");
        return setTimeout((function() {
          $tooltip.addClass("fade");
          return position($tooltip);
        }), 15);
      }, 500));
    };
    hide = function($tooltip) {
      var transitionDuration;
      transitionDuration = 250;
      $tooltip.removeClass("fade");
      return setTimeout((function() {
        return $tooltip.removeClass("show top");
      }), transitionDuration);
    };
    elementVisibleBottom = function($el) {
      if ($el.length < 1) {
        return;
      }
      return $el.offset().top + $el.height() <= $(window).scrollTop() + $(window).height();
    };
    return bindEvents();
  });

}).call(this);
