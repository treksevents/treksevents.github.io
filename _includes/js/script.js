(function offcanvas() {
  var b = $('body');
  var win = $(window);
  var doc = $(document);
  doc.click(function(e){
    var t = $(e.target);
    if (t.closest('.menuopen').length === 0 && t.closest('.aside').length === 0) {
      b.removeClass('offcanvas');
    }
  });
  $('.menuopen').click(function() {
    if (b.hasClass('offcanvas')) {
      b.removeClass('offcanvas');
    } else {
      b.addClass('offcanvas');
    }
  });
  $('.menuclose').click(function() {
    b.removeClass('offcanvas');
  });

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function header() {
    var h = win.height();
    var t = win.scrollTop();
    var hd = $('#header');

    if (t > (h/2)) {
      if (!hd.hasClass('fixed')) {
        hd
        .addClass('fixed')
        .css({
          top: -50
        })
        .animate({
          top: 0
        }, 600);
      }
    } else {
      if (hd.hasClass('fixed')) {
        hd.removeClass('fixed');
      }
    }
  }

  function footer() {
    var dh = doc.height();
    var wh = win.height();
    var st = win.scrollTop();
    var ft = $('#footer');

    // console.log(dh + ' | ' + wh + ' | ' + (dh-wh-150) + ' | ' + st);
    if ((dh-wh-150) < st) {
      ft.css('z-index', 0);
    } else {
      ft.css('z-index', -1);
    }
  }

  function cover() {
    var h = win.height();
    var t = win.scrollTop();
    var c = $('section.cover');

    var o = 1 - (t/h) * 1.5;
    if (o > 0) {
      c.css({
        opacity: o
      });
    }
  }

  function story() {
    var el = $('section.story article');

    el.on('inview', function (event, visible) {
      if (visible == true) {
        $(this).addClass('inview');
      } else {
        // element has gone out of viewport
      }
    });
  }
  header();
  footer();
  cover();
  story();

  win.on('scroll resize', debounce(function(e) {
    header();
    footer();
  }, 200, false));

  win.on('scroll resize', function(e) {
    cover();
  });

  $('.cover article button').click(function() {
    $('html, body').animate({
        scrollTop: $("section.story").offset().top
    }, 2000);
  });
})();
