$(document)
.ready(function() {

  // fix menu when passed
  $('.masthead')
    .visibility({
      once: false,
      onBottomPassed: function() {
        $('.fixed.menu').transition('fade in');
      },
      onBottomPassedReverse: function() {
        $('.fixed.menu').transition('fade out');
      }
    })
  ;

  // create sidebar and attach to menu open
  $('.ui.sidebar')
    .sidebar('attach events', '.toc.item');
 
 
 
  // классы менюшек для идентификаторов
  var menus = ['.ui.large.secondary.inverted.pointing.menu', '.ui.container', '.ui.vertical.inverted.sidebar.menu.left'];
  
  // функция - активатор элементов меню
  function menuActiveElement (menus) {
  menus.forEach(function(item) {
   var curElem = $(item)[0];
    for (var i = 0; i < curElem.childNodes.length; i++) {
      (curElem.childNodes[i].pathname == window.location.pathname) ? curElem.childNodes[i].className += ' active' : curElem.childNodes[i].className;
      }
    });
  }
  
  // собственно активация
  menuActiveElement(menus);

})
;