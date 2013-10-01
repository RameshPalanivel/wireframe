// cart Form

jQuery(function() {

	jQuery(document).click(function(event) {
		  var target = jQuery(event.target);
		  var src = target.attr('id');
		  var button = jQuery('#cartButton');
		    var box = jQuery('#cartBox');
		    var form = jQuery('#cartForm');
		  
		  if(src == "cartButton" || src == "arrowid"){
			 // button.toggleClass('active');
		  }else{
			  button.removeClass();
			  jQuery("#cartBox").attr("style","");
		  }
	
	});
    var button = jQuery('#cartButton');
    var box = jQuery('#cartBox');
    var form = jQuery('#cartForm');
    button.removeAttr('href');
    button.mouseup(function(cart) {
      
    });
    form.mouseup(function() { 
        return false;
    });
    jQuery(this).mouseup(function(login) {
        if(!(jQuery(login.target).parent('#cartButton').length > 0)) {
        	
        }
    });

});
