(function offcanvas() {
  var b = $('body');
  $(document).click(function(e){
    var t = $(e.target);
    if (t.closest('#menu').length === 0 && t.closest('.aside').length === 0) {
      b.removeClass('offcanvas');
    }
  });
  $('#menu').click(function() {
    if (b.hasClass('offcanvas')) {
      b.removeClass('offcanvas');
    } else {
      b.addClass('offcanvas');
    }
  });
  $('#menuclose').click(function() {
    b.removeClass('offcanvas');
  });
})();
