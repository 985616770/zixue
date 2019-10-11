var dropdown = $('.dropdown');

// dropdown.on('hover',slient.show(dropdown),slient.hide(dropdown))
// dropdown.hover(slient.show(dropdown), slient.hide(dropdown));
dropdown.hover(function() {
  slient.show(this);
},function (){
  slient.hide(this);
});
