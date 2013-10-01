
/**************************************** 
//
// Written by Tyler Jefford
// Website http://divisionoverlay.net
// Version 3.0.2
// Purpose Detect browsers and trigger
//         an action.
//
***************************************/

(function( $ ){

  $.fn.target = function( options ) {  

	var settings = $.extend( {
	  'browser' : '',
	  'ver' : '',
	  'msg' : '',
	  'action' : 'banner', 
	  'url' : '',
	  'cssUrl' : ''
	}, options);

	return this.each(function() {        

	  var op = options;   

	  function doAction(){
		  //Banner
		  if(op.action == "banner" && op.msg){
			$('body').prepend('<div id="target_message">'+ op.msg +'<a href="#" class="target_close">X</a></div>');
		  }

		  //Relocate
		  if(op.action == "relocate" && op.url){
			window.open (op.url,'_self',true)
		  }

		  //Alert
		  if(op.action == "alert" && op.msg){
			alert(op.msg);
		  }

		  //Styles
		  if(op.action == "style" && op.cssUrl){
		  
		  	var place = document.getElementsByTagName("head")[0];
		  	var newCss = document.createElement('link');
		  	newCss.type = 'text/css';
		  	newCss.rel = 'stylesheet';
		  	newCss.href = op.cssUrl;
		  	newCss.media = 'screen';
		  	place.appendChild(newCss);
		   
		}
	  }

	  // ================= Begin Browser Detection ==================== //

	  //Detect webkit based browsers
	  if(op.browser == "safari" || op.browser == "chrome" || op.browser == "webkit"){

			var webkit = $.browser.webkit;

			if(webkit){
				doAction();
			}

		}

		//Detect Mozilla based Browsers
		if(op.browser == "firefox"  || op.browser == "moz" || op.browser == "mozilla"){

			var moz = $.browser.mozilla;

			if(moz){
				doAction();
			}

		}

		//Detect Opera Browser
		if(op.browser == "opera"){

			var opera = $.browser.opera;

			if(opera){
				doAction();
			}

		}

		//Detect IE browsers
		if(op.browser == "ie" && op.ver){

			//Sets the .0 on the version number
			var ver = op.ver+".0";

			//This will get the version number
			var clientVersion = $.browser.version;

			//Target Internet Explorer 6 - 10
			var ie = $.browser.msie;

			if(ie && clientVersion == ver){
				doAction();
			}


		}

	  // ================= End Browser Detection ==================== //



	  // ================= Begin Banner Styles ==================== //

		//Close banner
		$(".target_close").click(function(e){
			e.preventDefault();
			$("#target_message").slideUp("slow");
		});
		$("#target_message").hide();
		$("#target_message").delay("1000").slideDown("slow");

		//Target-Message Styles
		$("#target_message").css({'width':'100%','height':'25px','padding-left':'20px','position':'relative','z-index':'9999','background-color':'#333','text-align':'left','font-size':'11px','line-height':'25px','color':'#fff'});
		$(".target_close").css({'width':'20px','float':'right','padding-right':'25px','color':'#fff','text-decoration':'none'});
		$(".ielink").css({'color':'#DBDE3E','text-decoration':'none'});

	// ================= End Banner Styles ==================== //

	});

  };
  
  $(document).ready(function(){   	
		$('body').target({	
			browser: 'ie',
			ver: '6',
			msg: 'Your browser (Internet Explorer 6) is out of date. It has known security flaws and may not display properly and features of our website.! <a class="ielink" href="http://windows.microsoft.com/en-US/internet-explorer/downloads/ie">click here</a> to upgrade your browser.',
			action: 'banner'
		});
		$('body').target({	
			browser: 'ie',
			ver: '7',
			msg: 'Your browser (Internet Explorer 7) is out of date. It has known security flaws and may not display properly and features of our website.! <a class="ielink" href="http://windows.microsoft.com/en-US/internet-explorer/downloads/ie">click here</a> to upgrade your browser.',
			action: 'banner'
		});
		$('body').target({	
			browser: 'ie',
			ver: '8',
			msg: 'Your browser (Internet Explorer 8) is out of date. It has known security flaws and may not display properly and features of our website.! <a class="ielink" href="http://windows.microsoft.com/en-US/internet-explorer/downloads/ie">click here</a> to upgrade your browser.',
			action: 'banner'
		});
	});
  
})( jQuery );