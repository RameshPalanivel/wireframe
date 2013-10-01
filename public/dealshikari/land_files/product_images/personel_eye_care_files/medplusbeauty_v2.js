
//closehtmlbody.ftl
function showhide(){
	var display = $("#cartBox").attr("style");
	var box = $('#cartBox');
	var button = $('#cartButton');
	if(display == "display:block;"){
		$("#cartBox").attr("style","");
		   button.removeClass();
	}
	else{
		$("#cartBox").attr("style","display:block;");
		  	 button.toggleClass('active');	
	}
}

function wishlistbody() {
	jQuery.noConflict();
	$('#wishlistbody').modal(function(){
		minHeight:auto;
		minWidth:auto;
	});
}

//main.ftl, CategoryMain.ftl
function reRunJs(){
	jQuery.noConflict();
    jQuery(".capslide_img_cont").capslide({
        caption_color   : 'white',
        caption_bgcolor : 'black',
        overlay_bgcolor : '',
        border          : '',
        showcaption     : false
    });
}

//main.ftl, CategoryMain.ftl
function getfbid(productId){
	var nodes = $('.active');
	for(i=0;i<nodes.size();i++){
		nodes[i].className='';
	}
   document.getElementById(productId).innerHTML=   "<span class=\"active\">&nbsp;</span>"; 
   reRunJs();
}

function submitSearch(){ 
jQuery("#searchString").val()=="Search for Products"&&jQuery("#searchString").attr("value","");
if (jQuery("#searchString").val().trim() == "") {
	e.preventDefault();
}
document.keywordsearchform.submit()};


jQuery(document).ready(function () {
	
	jQuery('#keywordsearchbox_keywordsearchform').submit(function(e){
		var selected = jQuery('#autocomplete ul li.focus a').text()
		if (selected){
			jQuery("#searchString").val(selected);
		}
		jQuery('#autocomplete').fadeOut('fast');
		if (jQuery("#searchString").val().trim() == "") {
			e.preventDefault();
		}
	})

	
	jQuery("#searchString").keyup(function(e) {
	    var n = e.keyCode;
        if ((n == 9) || (n == 46) || (n >= 96 && n <= 105) || (n == 37) || (n == 39) || (n == 13) || (n == 16) || (n == 17) || (n == 18)) {
            e.preventDefault();
            return;
        } else {
	    	if(e.keyCode === 40) {
	    		e.preventDefault();
				if(jQuery('.focus').length == 0) {
					jQuery('#autocomplete ul li:first').addClass("focus");
				} else {
					if(jQuery('#autocomplete ul li.focus').next('li').length != 0) {
					    jQuery('#autocomplete ul li.focus').removeClass("focus").next('li').addClass("focus");
					}
				}
				//jQuery(this).val(jQuery('#autocomplete ul li.focus a').text());
				jQuery('#autocomplete ul li.focus a').focus();
				jQuery("#searchString").focus();
				return;
			} else if(e.keyCode === 38) {
				e.preventDefault();
				if(jQuery('.focus').length == 0) {
					jQuery('#autocomplete ul li:first').addClass("focus");
				} else {
					if(jQuery('#autocomplete ul li.focus').prev('li').length != 0) {
					    jQuery('#autocomplete ul li.focus').removeClass("focus").prev('li').addClass("focus");
					}
				}
				//jQuery(this).val(jQuery('#autocomplete ul li.focus a').text());
				jQuery('#autocomplete ul li.focus a').focus();
				jQuery("#searchString").focus();
				return;
			}
	    	
	    	var searchText = jQuery("#searchString").val();
	    	if (searchText) {
	    	jQuery.ajax({
                url: jQuery('#autoCompleteUrl').val()+"?SEARCH_STRING="+searchText,
                type: "POST",
                success: function(data) {
                    jQuery('#autocomplete').html(data);
                    if($('#autocomplete').find('ul li').length) {
                        jQuery('#autocomplete').fadeIn();
                    } else {
            	        jQuery('#autocomplete').fadeOut('fast');
            	    }
			    	jQuery('#autocomplete ul li').mouseenter(function(){
			    		jQuery('#autocomplete ul li.focus').removeClass("focus");
			    		jQuery(this).addClass("focus");
			    		//jQuery("#searchString").val(jQuery('#autocomplete ul li.focus a').text());
			    	}).mouseleave(function(){
			    		jQuery(this).removeClass("focus");
			    	});
                }
            });
	    } else {
	        jQuery('#autocomplete').fadeOut('fast');
	    }
	    }
	    });
	    jQuery('html').click(function(e){
	    	jQuery('#autocomplete').fadeOut('fast');
	    });
	});

function disableEnterKey(e){
    var key;
    var qty = $('#quantity').val()
    qty = $.trim(qty);
    if(window.event){ 
        key = window.event.keyCode;
    }else{
        key = e.which;     
    }
    if(key == 13){
        return false;
    }else{
        return true;
    }  
}

function fn_gotoVirtualStudio(){
    window.location="/control/virtualmakeup?productId="+ document.getElementById('hiddenProductId').value;
}

function showAddToCatProduct(productId,productName,productImageUlr,productPrice) {
    $('#productName').show().html(productName);
    $('#hiddenProductId').val(productId);
    $('#hiddenWLProductId').val(productId);
    $('#product_Id').val(productId);
    $('#productPrice').show().html(productPrice);
    $('#basic-modal-content').modal();
}

function showAddToWishListQV(){
	jQuery('#productquickview').fadeOut('slow',function(){
	$("#simplemodal-container").css({height:"auto", width:"auto"});
	jQuery('#wishlistbody').show();
	});
}

function funcreateWishList(){
	$("#simplemodal-container").css({height:"auto", width:"auto"});
	jQuery("#wishListName").show();
	jQuery("#listName").focus();
}

function showAddToWishList(productId){
	$('#hiddenWLProductId').val(productId);
	$('#wishlistbody').modal();
}

function showAddToWishListVariant(){
	$('#hiddenWLProductId').val(document.getElementById('skuId').innerHTML);
	if(jQuery("#hiddenWLProductId").val()=="")
	{
		alert("Please Select a Variant");
	}else{
	$('#wishlistbody').modal();
	}
}

function showNotifyMe(){
	jQuery('#notifyMe').show();
}

function validateNotifyEmail(id){
	jQuery('#'+id+'-error').html('');
	var emailAddress=jQuery('#'+id).val();
	var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
	if(emailAddress=="" || emailAddress==jQuery('#'+id).attr('title')){
		jQuery('#'+id).val('');
		jQuery('#'+id+'-error').html("This is a required field");
		jQuery('#'+id).addClass("inputmdmerror");
		return false;
	}else if(!filter.test(emailAddress)){
	jQuery('#'+id).val('');
	jQuery('#'+id+'-error').html("Invalid E-mail Id.");
	jQuery('#'+id).addClass("inputmdmerror");
	return false;
	}
}

function cleanNotifyBlock() {
	jQuery('#successPanel').hide();
    jQuery('#errorPanel').hide();
    jQuery('#infoPanel').hide();
    jQuery('#emailAddressTo').removeClass('inputmdmerror');
    jQuery('#emailAddressTo-error').html('');
}

function fun_valiadteWlName(id){
	jQuery('#'+id+'-error').html('');
	var wishlistname=jQuery('#'+id).val();
	if(wishlistname=="" || wishlistname==jQuery('#'+id).attr('title')){
		jQuery('#'+id).val('');
		jQuery('#'+id+'-error').html("This is a required field");
		jQuery('#'+id).addClass("inputmdmerror");
		return false;
	}
}

$('#catalogLoginForm').bind('keypress', function(e) {
        if(e.keyCode==13){
        fun_doLogin();
        }
});

$('#emailAddressForm').bind('keypress', function(e) {
        if(e.keyCode==13){
        validateFormAndSubmit();
        }
});

$('#CreateWishListForm').bind('keypress', function(e) {
        if(e.keyCode==13){
        showCreateWishList("CreateWishListForm");
        }
});

$('#WishListForm').bind('keypress', function(e) {
        if(e.keyCode==13){
        addToWishList("WishListForm")
        }
});

function atpCheck(productId,qty) {
    $.get("/getProductATP?productId=" +productId,
       function(data) {
         document.getElementById('qtyAvailable').innerHTML=data.qty;
       });
}

function loginCataLog(formName){
	jQuery.ajax({
	url:'catalogLogin',
	type: 'POST',
	data: eval("jQuery('#"+formName+"').serialize()"),
	success: function(json){
	}
	})
}

function emailWhenAvailable() {
	if(false == validateNotifyEmail('emailAddressTo')){return false;}
	jQuery("#quickViewNtfyBtn").hide();
    jQuery("#quickViewNtfyBtnLoader").show();
    jQuery.ajax({
        url: '/control/notifyWhenAvailable',
        type: 'POST',
        data: eval("jQuery('#availableForm').serialize()"),
        success: function(json) {
            var msg;
            if (json._EVENT_MESSAGE_ != undefined) {
            msg = json._EVENT_MESSAGE_;
               jQuery('#successPanel').show();
               jQuery('#errorPanel').hide();
               jQuery('#infoPanel').hide();
             }
             if (json._ERROR_MESSAGE_ != undefined) {
                msg = json._ERROR_MESSAGE_;
                jQuery('#errorPanel').show();
                jQuery('#successPanel').hide();
               jQuery('#infoPanel').hide();
             }
             if (json._ERROR_MESSAGE_LIST_  != undefined) {
                msg = json._ERROR_MESSAGE_LIST_ ;
                jQuery('#errorPanel').hide();
                jQuery('#successPanel').hide();
               jQuery('#infoPanel').show();
             }
             jQuery('#emailAddressTo').val("");
        },
        complete: function(){
                    	  jQuery("#quickViewNtfyBtn").show();
                		  jQuery("#quickViewNtfyBtnLoader").hide();
                    }
    });
}

var addCatProducts = jQuery('#addCatProducts').val();
var refreshHeader = jQuery('#refreshHeader').val();
function addCatProduct(formName,othis) {
	$('#btnAddToBag').attr("disabled", true);
	var res = new RegExp(/^[0-9]+$/);
	//alert('quantity : '+document.addform.quantity.value);
	if(res.test(document.addform.quantity.value)){
		$('#popuperror').hide();
		jQuery("#btnAddToBagPD").hide();
		jQuery("#addtobagloader").show();
		jQuery.ajax({
			url: addCatProducts,
			type: 'POST',
			data: eval("jQuery('#"+formName+"').serialize()"),
			success: function(json) {
				var errMsg;
				
				if (json._ERROR_MESSAGE_LIST_ != undefined) {
				   errMsg = json._ERROR_MESSAGE_LIST_;
				}
				if (json._ERROR_MESSAGE_ != undefined) {
				   errMsg= json._ERROR_MESSAGE_;
				}
				$('#btnAddToBag').attr("disabled", true);
				//alert('errMsg : '+errMsg);
				if (errMsg != undefined) {
					 $('#btnAddToBag').attr("disabled", false);
					document.getElementById("quantity").value="0";
					jQuery('#popuperror').html(errMsg.toString());
					jQuery('#popuperror').show();
				}else {
					jQuery.ajax({
						url: refreshHeader,
						type: 'POST',
						cache: false,
						async:false,
						success: function(json) {
						
						jQuery('#refreshLinks').html(json);
						$('#btnAddToBag').attr("disabled", true);
						$("#cartContainer").removeClass();
						$.modal.close();
						$("html, body").animate({scrollTop:0}, 'slow');
						//$("#cartBox").attr("style","display:block;");
						$("#cartButton").addClass("active");
						jQuery("#cartBox").slideDown(500);
						jQuery("#cartBox").delay(5000).slideUp(500);
						}
					});
				}
			},
			complete: function(){
				  jQuery("#btnAddToBagPD").show();
				  jQuery("#addtobagloader").hide();
			}
		});
	} else {
		$('#btnAddToBag').attr("disabled", false);
		$('#popuperror').show().html("Invalid quantity");
	}
}
    
function fn_addProductToCart(formName,othis) {
	$('#btnAddToBag').attr("disabled", true);
	var res = new RegExp(/^[0-9]+$/);
	if(res.test(document.addform.quantity.value)){
		$('#popuperror').hide();
		jQuery.ajax({
			url: addCatProducts,
			type: 'POST',
			data: eval("jQuery('#"+formName+"').serialize()"),
			success: function(json) {
				var errMsg;
				
				if (json._ERROR_MESSAGE_LIST_ != undefined) {
				   errMsg = json._ERROR_MESSAGE_LIST_;
				}
				if (json._ERROR_MESSAGE_ != undefined) {
				   errMsg= json._ERROR_MESSAGE_;
				}
				$('#btnAddToBag').attr("disabled", true);
				if (errMsg != undefined) {
					 $('#btnAddToBag').attr("disabled", false);
					document.getElementById("quantity").value="0";
					jQuery('#popuperror').html(errMsg.toString());
					jQuery('#popuperror').show();
				}else {
					jQuery.ajax({
						url: refreshHeader,
						type: 'POST',
						cache: false,
						success: function(json) {
						jQuery('#refreshLinks').html(json);
						$('#btnAddToBag').attr("disabled", true);
						}
					});
				  }
				  
				   setTimeout('addDot()',1000);
				jQuery("#cartButton").addClass("active");
				jQuery("#cartBox").slideDown(500);
				jQuery("#cartBox").delay(5000).slideUp(500);
				//jQuery("#cartBox").attr("style","display:block;");
				
			}
		});
	} else {
		$('#btnAddToBag').attr("disabled", false);
		$('#popuperror').show().html("Invalid quantity");
	}
}

var popupLogin = jQuery('#popupLogin').val();
function fun_doLogin(){
	var wishListProductId = jQuery("#hiddenWLProductId").val();
	if(false == fun_validateEmail('wlUserName')){return false;}
	if(false == fun_validatePassword('wlPassowrd')){return false;}
	jQuery("#catalogloginLoader").show();
	jQuery("#cataloglogin").hide();
	jQuery.ajax({
		url: popupLogin,
		type:'POST',
		data: eval("jQuery('#catalogLoginForm').serialize()"),
		success: function(json) {
		var errMsg;
		 if (json._ERROR_MESSAGE_LIST_ != undefined) {
		   errMsg = json._ERROR_MESSAGE_LIST_[0];
		 }
		 if (json._ERROR_MESSAGE_ != undefined) {
		   errMsg= json._ERROR_MESSAGE_;
		 }
		 if (errMsg != undefined) {
		   $('#catalogLoginError').show().html(errMsg);
		 } 
		 else {
			var currentUrl = window.location.href;
			 if ($("#searchString").length > 0){
				var string = jQuery('#searchString').val();
				if(string != jQuery('#searchString').attr('title')) {
					if(currentUrl.indexOf("SEARCH_STRING") < 0) {
						if(currentUrl.indexOf("?") >= 0) {
							currentUrl = currentUrl+"&SEARCH_STRING="+string;
						} else {
							currentUrl = currentUrl+"?SEARCH_STRING="+string;
						}
					 } 
				 }
			 }
			if(currentUrl.indexOf("?") >= 0) {
				window.location.href = currentUrl+"&wishListProductId="+wishListProductId;
			} else {
				window.location.href = currentUrl+"?wishListProductId="+wishListProductId;
			}
			window.location.load();
		 }
		},
		complete: function(){
						  jQuery("#cataloglogin").show();
						  jQuery("#catalogloginLoader").hide();
					}
		});
}
    
var addItemToShoppingList = jQuery('#addItemToShoppingList').val();
function addToWishList(formName) {
	if(jQuery("#shoppingListId").val()=="" && jQuery("#listName").val()=="")
	{
		jQuery('#listName').focus();
		return false;
	}
	var wishlistname=jQuery('#listName').val();
	if(wishlistname!="" && wishlistname!=jQuery('#listName').attr('title')){
		if(false == fun_valiadteWlName('listName')){
			return false;
		}
	} else {
		jQuery('#listName').val("");
	}
	jQuery("#addToWishListLoader").show();
	jQuery("#addToWishListId").hide();	
	jQuery.ajax({
		url: addItemToShoppingList,
		type: 'POST',
		data: eval("jQuery('#"+formName+"').serialize()"),
		success: function(json) {
			var currentUrl = window.location.href;
			if ($("#searchString").length > 0){
				var string = jQuery('#searchString').val();
				if(string != jQuery('#searchString').attr('title')) {
					if(currentUrl.indexOf("SEARCH_STRING") < 0) {
						if(currentUrl.indexOf("?") >= 0) {
							currentUrl = currentUrl+"&SEARCH_STRING="+string;
						} else {
							currentUrl = currentUrl+"?SEARCH_STRING="+string;
						}
					}
				}
			}
			if(currentUrl.indexOf("wishListProductId") >= 0) {
				window.location.href = (window.location.href).substring(0, (currentUrl.indexOf("wishListProductId")-1));
				location.load();
			} else {
				if(currentUrl.indexOf("SEARCH_STRING") >= 0) {
					window.location.href = currentUrl;
					location.load();
				} else {
					location.reload();
				}
			}
		}
	});
}
function showCreateWishList(formName){	
	if(false == fun_valiadteWlName('listName')){
		return false;
	}
	jQuery("#CreateWishListLoader").show();
	jQuery("#CreateWishList").hide();
	jQuery.ajax({
			url: addItemToShoppingList,
			type: 'POST',
			data: eval("jQuery('#"+formName+"').serialize()"),
			success: function(json) {
				var currentUrl = window.location.href;
				if(currentUrl.indexOf("wishListProductId") >= 0) {
					window.location.href = (window.location.href).substring(0, (currentUrl.indexOf("wishListProductId")-1));
					location.load();
				} else {
					location.reload();
				}
			},
			complete: function(){
						  jQuery("#CreateWishList").show();
						  jQuery("#CreateWishListLoader").hide();
					}
	});
}
    
    
    
var getProductQuickViewJSON = jQuery('#getProductQuickViewJSON').val();
var imgUrlPrefix = jQuery('#quickViewProductImgUrlPrefix').val();
function quickviewbody(productId) {
    jQuery.noConflict();
    document.getElementById('quickViewProductId').value=productId;
    document.getElementById('quickViewProductIdDisplay').innerHTML="SKU ID: " + productId;
    document.getElementById('productImage').src=imgUrlPrefix+productId+"_M.jpg";
    $.get(getProductQuickViewJSON + productId,
	function(data) {
		document.getElementById('loyaltyPoints').className="hidden";
		document.getElementById('totalSavings').className="hidden";
		document.getElementById('colorVariants').className="hidden";
		document.getElementById('sizeVariants').className="hidden";
		document.getElementById('offerJson').className='hidden';
		document.getElementById('colorBoxonImageQV').setAttribute('style','display:none;');
		var select = document.getElementById('sizeVariantsSelect');
		$('#colorUl').empty();
		while (select.firstChild) {
		    select.removeChild(select.firstChild);
		}
		$('div#quickviewbody').loadJSON(data);
		if(data.loyaltyPoints!=null){
				if(data.qty=='N')
					document.getElementById('loyaltyPoints').className='margin-t';
				else
					document.getElementById('loyaltyPoints').className='padding-t border-top';
			document.getElementById('loyaltyPoints').innerHTML='<strong>ValuePlus Points : '+data.loyaltyPoints+'</strong>';
			}
			if(data.totalSavings!=null){
				if(data.loyaltyPoints!=null || data.qty=="N")
					document.getElementById('totalSavings').className='margin-t';
				else
					document.getElementById('totalSavings').className='padding-t border-top';
				document.getElementById('totalSavings').innerHTML='<strong>Total Savings: '+data.totalSavings+'%</strong>';
			}
			if(data.mrp != undefined && data.mrp!=null){
				document.getElementById('isSaleJson').className='';
				document.getElementById('mrpJson').innerHTML=data.mrp;
			}
			if(data.productPriceJson != undefined){
				if(data.productPriceJson == "0"){ 
				    if(data.mrp!=null){
				       document.getElementById('mrpsJson').innerHTML=data.mrp;
				    }
			       document.getElementById('isMrpSaleJson').className='';
			       document.getElementById('isSaleJson').className='hidden'; 
			       document.getElementById('sellPriceImg').className='hidden';
			       document.getElementById('productPriceJson').innerHTML='';
			   }else{
				   document.getElementById('isMrpSaleJson').className='hidden';
			       document.getElementById('isSaleJson').className=''; 
			       document.getElementById('sellPriceImg').className='';
			       document.getElementById('productPriceJson').innerHTML=data.productPriceJson;
			   }
			}else{
				document.getElementById('mrpsJson').innerHTML='0';
				document.getElementById('isMrpSaleJson').className='';
			    document.getElementById('isSaleJson').className='hidden'; 
			    document.getElementById('sellPriceImg').className='hidden';
			    document.getElementById('productPriceJson').innerHTML='';
			}
			
			if(data.qtyAvailable=='N'){
			   if(data.isInventoryOpen == 'true'){
			   }else{
				  document.getElementById('notifyMe').className="hidden";
			   }
			}
			if(data.offerDetailsJson!=null){
			   document.getElementById('offerJson').className='margin-t';
				var offers= data.offerDetailsJson.split(":");
				for(i=0;i<offers.length;i++){
				   document.getElementById('offerJson').innerHTML='<strong>'+data.offerDetailsJson.replace(':',', ')+'</strong>&nbsp;';
				}
			}
			document.getElementById('isMakeUpProductJson').className="button-litblk margin-t";
			if(data.isMakeUpProductJson==false){						         			
				document.getElementById('isMakeUpProductJson').className="hidden";
			}
			if(data.isColorVariant!=null){
		 		if(data.isColorVariant==true){
		 			document.getElementById('colorVariants').className="margin-t inblock";
		     		if(data.variantProductIdsStr!=null){
		     			var variants=data.variantProductIdsStr.split("$");
		         		var ulTag=document.getElementById('colorUl');
		         		for(i=0;i<variants.length;i++){
		         			var innerVariants=variants[i].split(":");
		         			var liTag = document.createElement('li');
		         			liTag.setAttribute('style', "background:"+innerVariants[2]+";");
		         			liTag.setAttribute('id', innerVariants[0]+"-var");
		         			if(i==0){
		         				liTag.innerHTML='<span class="active">&nbsp;</span>';
		         			}
		         			liTag.setAttribute('onclick',"changeVariantPrice('"+innerVariants[3]+"','"+innerVariants[4]+"','"+innerVariants[0]+"','"+innerVariants[1]+"','"+innerVariants[5]+"','"+innerVariants[6]+"','"+innerVariants[7]+"','"+innerVariants[8]+"','"+innerVariants[9]+"','"+innerVariants[10]+"',"+i+",'"+innerVariants[2]+"')");
							ulTag.appendChild(liTag);
							if(i==0){
							   changeVariantPrice(innerVariants[3],innerVariants[4],innerVariants[0],innerVariants[1],innerVariants[5],innerVariants[6],innerVariants[7],innerVariants[8],innerVariants[9],innerVariants[10],i,innerVariants[2]);
		         			}
		         		}
		         	}						         		
		 		}
			}
			if(data.isSizeVariant!=null){
		 		if(data.isColorVariant!=true){
		 			document.getElementById('sizeVariants').className="margin-t inblock";
		 			if(data.variantProductIdsStr!=null){
		         		var variants=data.variantProductIdsStr.split("$");
		         		
		         		var objSelect=document.getElementById('sizeVariantsSelect');
		         		for(i=0;i<variants.length;i++){
		         			var innerVariants=variants[i].split(":");
		         			var objOption = document.createElement("option");
							objOption.text = innerVariants[1];
							objOption.value = variants[i];
							objOption.id = innerVariants[1]+"_VALUE";
							if(document.all && !window.opera)
							{
							  	objSelect.add(objOption);
							}
							else
							{
								objSelect.add(objOption, null);
								
							}
							if(i==0){
								changeSizeVariantPrice(variants[i]);
							}
						
		         		}
		         	}						         		
		 		}
			}
		    if((data.isColorVariant!=null && data.isColorVariant==true) || (data.isSizeVariant!=null && data.isSizeVariant==true)){
		    }else{
		    	if(data.qty=="Y"){
					document.getElementById('btnAddToBag').className='padding-b';
						document.getElementById('notifyMe').className='hidden';
				}else{
				    if(data.isInventoryOpen){
				          document.getElementById('btnAddToBag').className='padding-b';
		                 document.getElementById('notifyMe').className='hidden';
				    }else{
					     document.getElementById('btnAddToBag').className='hidden';
					     cleanNotifyBlock();
					     document.getElementById('notifyMe').className='border-all margin-t-b';
					    }
				}
			   $('#hiddenProductId').val(productId);
			   $('#hiddenWLProductId').val(productId);
			   $('#product_Id').val(productId);
			}
		    $('#quickviewbody').modal();
		    $("#simplemodal-container").css({height:"auto", width:"auto"});
	});
}

function changeVariantPrice(productPrice,productPromo,productId,colorName,productName,loyaltyPoints,totalSavings,mrp,qty,isInventoryOpen,i,colorCode){
	$('#popuperror').hide();
	document.getElementById('loyaltyPoints').className='hidden';
	document.getElementById('totalSavings').className='hidden';
	document.getElementById('offerJson').className='hidden';
	document.getElementById('colorBoxonImageQV').setAttribute('style','display:none;');
	if(colorCode.length > 0){
		document.getElementById('colorBoxonImageQV').className="qvbox";
		document.getElementById('colorBoxonImageQV').setAttribute('style','background:'+colorCode+';');
	}
		if(mrp.length>0){
		document.getElementById('isSaleJson').className='';
			document.getElementById('mrpJson').innerHTML=mrp;
	}
	
	if((productPrice == "0") || (productPrice == "0.0")){ 
        if(mrp.length>0){
           document.getElementById('mrpsJson').innerHTML=mrp;
        }
        document.getElementById('isMrpSaleJson').className='';
        document.getElementById('isSaleJson').className='hidden'; 
        document.getElementById('sellPriceImg').className='hidden';
        document.getElementById('productPriceJson').innerHTML='';
    }else{
        document.getElementById('isMrpSaleJson').className='hidden';
        document.getElementById('isSaleJson').className=''; 
        document.getElementById('sellPriceImg').className='';
        document.getElementById('productPriceJson').innerHTML=productPrice;
    }
		if(loyaltyPoints.length>0){
			document.getElementById('loyaltyPoints').className='margin-t';
			document.getElementById('loyaltyPoints').innerHTML='<strong>ValuePlus Points : '+loyaltyPoints+'</strong>';
		}
		if(totalSavings.length>0){
			document.getElementById('totalSavings').className='margin-t';
			document.getElementById('totalSavings').innerHTML='<strong>Total Savings: '+totalSavings+'%</strong>';
		}
		if(qty=='Y'){
			document.getElementById('btnAddToBag').className='padding-b border-b';
			document.getElementById('notifyMe').className='hidden';
		}else{
		    if(isInventoryOpen == 'true'){
			     document.getElementById('btnAddToBag').className='padding-b border-b';
             document.getElementById('notifyMe').className='hidden';
			}else{
				document.getElementById('btnAddToBag').className='hidden';
				cleanNotifyBlock();
				document.getElementById('notifyMe').className='border-all margin-t-b';
			}
		}
	 	document.getElementById('quickViewProductIdDisplay').innerHTML="SKU ID: " + productId;
	  	document.getElementById('productNameJson').innerHTML=productName;
	  	$('#hiddenProductId').val(productId);
	   	$('#hiddenWLProductId').val(productId);
	   	$('#product_Id').val(productId);
	   	
	   	if(productPromo != null && productPromo.length>2){
	   		document.getElementById('offerJson').className='margin-t';
			document.getElementById('offerJson').innerHTML = '<strong>'+productPromo.substring(1,productPromo.length-1).replace("|",", ")+'</strong>&nbsp;'
		}
	var nodes = $('.activepopupclr');
        for(i=0;i<nodes.size();i++){
        nodes[i].className='';
     }
    document.getElementById(productId+'-var').innerHTML='<span class="activepopupclr">&nbsp;</span>';
}

function changeSizeVariantPrice(productInfoStr){
		var each=productInfoStr.split(":");
		document.getElementById('loyaltyPoints').className='hidden';
		document.getElementById('totalSavings').className='hidden';
		document.getElementById('offerJson').className='hidden';
		document.getElementById('colorBoxonImageQV').setAttribute('style','display:none;');
		if(each[6].length>0){
			document.getElementById('loyaltyPoints').className='margin-t';
			document.getElementById('loyaltyPoints').innerHTML='<strong>ValuePlus Points : '+each[6]+'</strong>';
		}
		if(each[7].length>0){
			document.getElementById('totalSavings').className='margin-t';
			document.getElementById('totalSavings').innerHTML='<strong>Total Savings: '+each[7]+'%</strong>';
		}
		document.getElementById('mrpJson').innerHTML=each[8];
		document.getElementById('productPriceJson').innerHTML=each[3];
		if((each[3] == "0") || (each[3] == "0.0")){ 
        document.getElementById('mrpsJson').innerHTML=each[8];
        document.getElementById('isMrpSaleJson').className='';
        document.getElementById('isSaleJson').className='hidden'; 
        document.getElementById('sellPriceImg').className='hidden';
        document.getElementById('productPriceJson').innerHTML='';
    }else{
        document.getElementById('isMrpSaleJson').className='hidden';
        document.getElementById('isSaleJson').className=''; 
        document.getElementById('sellPriceImg').className='';
        document.getElementById('productPriceJson').innerHTML=each[3];
    }
	 	document.getElementById('quickViewProductIdDisplay').innerHTML="SKU ID: " + each[0];
	  	document.getElementById('productNameJson').innerHTML=each[5];
	  	if(each[9]=='Y'){
			document.getElementById('btnAddToBag').className='padding-b border-b';
			document.getElementById('notifyMe').className='hidden';
		}else{
		    if(each[10] == 'true'){
		         document.getElementById('btnAddToBag').className='padding-b border-b';
             document.getElementById('notifyMe').className='hidden';
		    }else{
			    document.getElementById('btnAddToBag').className='hidden';
			    cleanNotifyBlock();
			    document.getElementById('notifyMe').className='border-all margin-t-b';
			}
		}
		$('#hiddenProductId').val(each[0]);
		$('#hiddenWLProductId').val(each[0]);
		if(each[4] != null && each[4].length>2 ){
			document.getElementById('offerJson').className='margin-t';
		document.getElementById('offerJson').innerHTML='<strong>'+each[4].substring(1,each[4].length-1).replace("|",", ")+'</strong>&nbsp;';
	}
}


// Footer.ftl
function pincodebody() {
     jQuery.noConflict();
    $('#pincodebody').modal(function(){
		minHeight:auto;
		minWidth:auto;
	});
}

function disableEnterKey(e){
	var key;
	var emailId = $('#email').val()
	emailId = $.trim(emailId);
	if(window.event){ 
		key = window.event.keyCode;
    }else{
    	key = e.which;     
    }
    if(key == 13 && emailId==''){
    	jQuery("#serverMsg").html("Please Enter Valid EmailId");
    	jQuery.noConflict();
    	$('#subscribebody').modal();
    	return false;
    }else{
    	return true;
    }  
}

function registerbody() {
    jQuery.noConflict();
    $('#registerbody').modal();
}

function fun_validateEmail(id){
	jQuery("#simplemodal-container").css({height:"auto", width:"auto"});
	jQuery('#'+id+'-error').html('');
	var emailAddress=jQuery('#'+id).val();
	var filter = /^[a-zA-Z0-9]+([_.-]?[a-zA-Z0-9])*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9])*\.[a-z]{2,4}$/;
	if(emailAddress=="" || emailAddress==jQuery('#'+id).attr('title')){
		jQuery('#'+id).val('');
		jQuery('#'+id+'-error').html("This is a required field");
		jQuery('#'+id).addClass("inputsmlerror");
		return false;
	}else if(!filter.test(emailAddress)){
	jQuery('#'+id).val('');
	jQuery('#'+id+'-error').html("Invalid E-mail Id.");
	jQuery('#'+id).addClass("inputsmlerror");
	return false;
	}
}
function fun_validatePassword(id){
	jQuery('#'+id+'-error').html('');
	var password=jQuery('#'+id).val();
	var filter= /^\S+$/ ;
	if(password==""){
		jQuery('#'+id).val('');
		jQuery('#'+id+'-error').html("This is a required field");
		jQuery('#'+id).addClass("inputsmlerror");
		return false;
	}else if(password.length < 6){
		jQuery('#'+id).val('');
		jQuery('#'+id+'-error').html("Minimum 6 characters.");
		jQuery('#'+id).addClass("inputsmlerror");
		return false;
	}else if(!filter.test(password)){
		jQuery('#'+id).val('');
		jQuery('#'+id+'-error').html("Should not contain space.");
		jQuery('#'+id).addClass("inputsmlerror");
		return false;
	}
}
function fun_validateVerifyPassword(pwdId,verifyPwdId){
	jQuery('#'+verifyPwdId+'-error').html('');
	var password=jQuery('#'+pwdId).val();
	var verifyPwd=jQuery('#'+verifyPwdId).val();
	if(password != verifyPwd){
		jQuery('#'+verifyPwdId).val('');
		jQuery('#'+verifyPwdId+'-error').html("Passwords do not match");
		jQuery('#'+verifyPwdId).addClass("inputsmlerror");
		return false;
	}
}

function validateSubEmail(id){
	jQuery('#'+id+'-error').html('');
	var emailAddress=jQuery('#'+id).val();
	var filter = /^[a-zA-Z0-9]+([_.-]?[a-zA-Z0-9])*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9])*\.[a-z]{2,4}$/;
	if(emailAddress=="" || emailAddress==jQuery('#'+id).attr('title')){
		jQuery('#'+id).val('');
		jQuery('#'+id+'-error').html("This is a required field");
		jQuery('#'+id).addClass("inputerror");
		return false;
	}else if(!filter.test(emailAddress)){
		jQuery('#'+id).val('');
		jQuery('#'+id+'-error').html("Invalid E-mail Id.");
		jQuery('#'+id).addClass("inputerror");
		return false;
	}
}
function fun_validateCODPin(id){
	jQuery('#'+id+'-error').html('');
	jQuery('#codAvailableMsg').html('');
	jQuery('#'+id).removeClass("inputerror");
	var rege =/^[1-9]+[0-9]{5}$/;
	var pin=jQuery('#'+id).val();
	if(pin=="" || pin==jQuery('#'+id).attr('title')){
		jQuery('#'+id).addClass("inputerror");
		jQuery('#'+id+'-error').html("This is a required field");
		return false;
	} else if(! rege.test(pin)){
		jQuery('#'+id).val('');
		jQuery('#'+id).addClass("inputerror");
		jQuery('#'+id+'-error').html("Invalid pincode");
		return false;
	}
}

var subcribeForNewLetter = jQuery('#subcribeForNewLetter').val();
function subscribeNewsLetter(){
	if(false ==validateSubEmail('email')) {
		//return false;
	} else {
	jQuery("#subscribeLetterLoader").show();
    jQuery("#subscribeLetter").hide();
    jQuery.ajax({url: subcribeForNewLetter,
    type:"POST",
    async:false,
    data:jQuery("#signUpForContactListForm").serialize(),
    success:function(json){
        var b;
        if(json._ERROR_MESSAGE_LIST_!=void 0)b=json._ERROR_MESSAGE_LIST_;
        if(json._ERROR_MESSAGE_!=void 0)b=json._ERROR_MESSAGE_;
        b!=void 0?jQuery("#serverMsg").html(b.toString()):jQuery("#serverMsg").html("Thank you for signing up for our newsletter.");
        jQuery.noConflict();
        $('#subscribebody').modal();
    },
    complete: function(){
		  jQuery("#subscribeLetter").show();
		  jQuery("#subscribeLetterLoader").hide();
	}
    });
        jQuery("#email").is(":disabled")||jQuery("#email").attr("value","Enter your email id to get subscribed");
        }
 };

 $('#pincodebody').bind('keypress', function(e) {
    if(e.keyCode==13){
    	checkCodAvailability();
    }
});

 var checkCodAvail = jQuery('#checkCodAvailability').val();
 function checkCodAvailability() {
	if (!(false == fun_validateCODPin('pincode'))) {
		jQuery("#codCheckBtn").hide();
        jQuery("#codCheckBtnLoader").show();
     	$.get(checkCodAvail + "?pincode=" + document.getElementById('pincode').value,
            function(data) {
                if (data.result == "true") { 
                	jQuery('#codAvailableMsg').html("COD AVAILABLE");
                }else if(data.result == "false"){
                	jQuery('#pincode-error').html("COD IS NOT AVAILABLE");
                }else if(data.result == "EXCEPTION"){
             		jQuery('#pincode-error').html("SERVICE ERROR ,PLEASE TRY LATER");
             	}
             	jQuery("#codCheckBtn").show();
                jQuery("#codCheckBtnLoader").hide();
            }
        );
    }
}

var createNewCustomer = jQuery('#createNewCustomer').val();
function registerNewCustomer(formName) {
	$('#errorId').hide();
    jQuery("#newCustsbmt").hide();
    jQuery("#newCustRegLoader").show();
    jQuery.ajax({
         url: createNewCustomer,
         type: 'POST',
         data: eval("jQuery('#"+formName+"').serialize()"),
         success: function(json) {
             var errMsg;
             if (json._ERROR_MESSAGE_LIST_ != undefined) {
                 errMsg = json._ERROR_MESSAGE_LIST_[0];
             } else if (json._ERROR_MESSAGE_ != undefined) {
                 errMsg= json._ERROR_MESSAGE_;
             }
             if (errMsg != undefined) {
                 jQuery('#registererror').html(errMsg);
                 jQuery('#errorId').show();
                 jQuery('#registererror').show();
                 jQuery("#newCustRegLoader").hide();
      			jQuery("#newCustsbmt").show();
             } else {
            	var userSelected=$('input:radio[name=userOption]:checked').val();
     			if(userSelected && "none"!=userSelected) {
     				//alert("redirecting to farmacy tab");
     				window.location.href = "MedplusPharmacy?userOption="+userSelected;
     			} else{
     				//alert("redirecting to my account tab");
         			window.location.href = "MyAccount";
     			}
             }
         }
     });
 }

function fun_validateNewUserForm(){
	var userOption=jQuery('#userOption');
	if(false == fun_validateEmail('emailAddress')){return false;}
	if(false == fun_validatePassword('password')){return false;}
	if(false == fun_validateVerifyPassword('password','passwordVerify')){return false;}
	if(userOption.attr('checked')){
		if(false == fun_validatestoreId('medplusStoreId')){return false;}
		if(false == fun_validatecontactNumber('mobileNumber')){return false;}
	}
	registerNewCustomer('newUserForm');
}

$('#newUserForm').bind('keypress', function(e) {
    if(e.keyCode==13){
    	fun_validateNewUserForm();
    }
});

// CommonHeader.ftl 
function doGo1(){
	if(jQuery("#UserName").val()==''){
		jQuery("#UserName").validationEngine('showPrompt', "<div>Please enter valid email address</div>","load","topRight",true);
		return;
	}
	 jQuery('#forgotPasswordForm2').submit();
}  

function forgotPasswordValidation(){
	if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(document.getElementById('UserName').value)){
		fn_doGo();
	} else {
		jQuery('#UserName').val("");
		jQuery('#UserName').addClass("inputsmlerror");
		jQuery('#popupLoginError').show().html("Invalid emailId");
		return false;
	}
}
$('#loginForm').bind('keypress', function(e) {
	if(e.keyCode==13){
		validateEmailIdAndPassword();
	}
});

function validateEmailIdAndPassword(){
	var password=jQuery('#newpassowrd').val();
	var filter= /^\S+$/ ;
	if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(document.getElementById('userName').value)){
		$('#popupLoginError').show().html("Invalid emailId.");
		document.getElementById('userName').value = '';
		document.getElementById('newpassowrd').value = '';
		jQuery('#userName').addClass("inputsmlerror");
		return false;
	}
	if( password.length==0){
		$('#popupLoginError').show().html("Enter Password.");
		document.getElementById('newpassowrd').value = '';
		jQuery('#newpassowrd').addClass("inputsmlerror");
		return false;
	}else if(!filter.test(password)){
		$('#popupLoginError').show().html("Should not contain space.");
		document.getElementById('newpassowrd').value = '';
		jQuery('#newpassowrd').addClass("inputsmlerror");
		return false;
	}
	jQuery("#loginbtn").hide();
	jQuery("#loginloader").show();
	jQuery.ajax({
		url: popupLogin,
		type:'POST',
		data: eval("jQuery('#loginForm').serialize()"),
		success: function(json) {
			var errMsg;
			 if (json._ERROR_MESSAGE_LIST_ != undefined) {
			   errMsg = json._ERROR_MESSAGE_LIST_[0];
			 }
			 if (json._ERROR_MESSAGE_ != undefined) {
			   errMsg= json._ERROR_MESSAGE_;
			 }
			 if (errMsg != undefined) {
			   $('#popupLoginError').show().html(errMsg);
			   jQuery("#loginloader").hide();
			   jQuery("#loginbtn").show();
			 } else {
				var currentUrl = window.location.href;
				if(currentUrl.indexOf("keywordsearch") >= 0) {
					if ($("#searchString").length > 0){
						var string = jQuery('#searchString').val();
						if(string != jQuery('#searchString').attr('title')) {
							if(currentUrl.indexOf("SEARCH_STRING") < 0) {
								if(currentUrl.indexOf("?") >= 0) {
									currentUrl = currentUrl+"&SEARCH_STRING="+string;
								} else {
									currentUrl = currentUrl+"?SEARCH_STRING="+string;
								}
							}
						}
					}
				}
				if(currentUrl.indexOf("SEARCH_STRING") >= 0) {
					window.location.href = currentUrl;
					location.load();
				} else {
					location.reload();
				}
			}
		}
	});
}
var forgotpasswordpopup = jQuery('#forgotpasswordpopup').val();
function fn_doGo(){
  userName = jQuery("#UserName").val();
  formName = 'loginForm';
  jQuery("#forgotpwdloader").show();
  jQuery("#forgotpwd").hide();
  jQuery.ajax({
	url:  forgotpasswordpopup + userName,
	type: 'POST',
	data: eval("jQuery('#"+formName+"').serialize()"),
	success: function(json) {
		if(json._EVENT_MESSAGE_ != undefined){
			alert(json._EVENT_MESSAGE_);
		}else if (json._ERROR_MESSAGE_!= undefined){
			jQuery('#UserName').val("");
			jQuery('#UserName').addClass("inputsmlerror");
			jQuery('#popupLoginError').show().html(json._ERROR_MESSAGE_);
		}
	},
	complete: function(){
			jQuery("#forgotpwd").show();
			jQuery("#forgotpwdloader").hide();
		}
  });
}
/*site map js starts*/
function showAndHideSiteMap(id){
	jQuery("#"+id).toggle();
}
function expandAll(){
	jQuery(".view_cat_top").fadeIn(1000)
	jQuery(".view_cat").fadeIn(1000);
	jQuery("#expand").hide();
	jQuery("#collapse").show();
}
function collapseAll(){
	jQuery(".view_cat").hide();
	jQuery(".view_cat_top").hide();
	jQuery("#collapse").hide();
	jQuery("#expand").show();
}
function showAndHideSiteMapTopCat(id){
	jQuery("#"+id).toggle();
}

function fun_validatecontactNumber(id){
	jQuery('#'+id).removeClass("inputsmlerror");
	var rege =/^[1-9]+[0-9]{9}$/;
	var number=jQuery('#'+id).val();
	if(number=='' || number== jQuery('#'+id).attr('title')) {
		jQuery('#'+id).removeClass('inputmbl');
		jQuery('#'+id).addClass("inputsmlerror");
		jQuery('#'+id+'-error').html("This is a required field");
		jQuery('#'+id).addClass("col5 alpha right margin-b");
		return false;
	} else if(! rege.test(number)){
		jQuery('#'+id).val('');
		jQuery('#'+id).removeClass('inputmbl');
		jQuery('#'+id).addClass("inputsmlerror");
		jQuery('#'+id+'-error').html("Invalid Phone Number");
		jQuery('#'+id).addClass("");
		return false;
	}
}
function fun_validatestoreId(id){
	var storeId=jQuery('#'+id).val();
	if(storeId == '' || storeId == 'Eg: 111941') {
		jQuery('#'+id).removeClass('inputmbl');
		jQuery('#'+id).addClass("inputsmlerror");
		jQuery('#'+id+'-error').html("This is a required field");
		jQuery('#'+id).addClass("");
		return false;
	}
}
/*site map js ends  fun_validateEmail*/

$('#emailAddressFormPharmacy').bind('keypress', function(e) {
    if(e.keyCode==13){
    	validateFormAndSubmitPharmacy();
    }
});

function toggleBrandDescMore(){
	jQuery('#brandSubStr').hide().delay(500);
	jQuery('#brandStr').fadeIn(2000);
	jQuery('#expand').toggle();
	jQuery('#collapse').toggle(500);
}

function toggleBrandDescLess(){
	jQuery('#brandStr').hide().delay(500);
	jQuery('#brandSubStr').fadeIn(2000);
	jQuery('#collapse').toggle();
	jQuery('#expand').toggle(500);
}

/*site map js ends  fun_validateEmail*/

/*newProductDetail.ftl,productRating.ftl files  js starts*/
function fun_validateReviewForm(){
	jQuery("#reviewsubmit").hide();
	jQuery("#reviewLoader").show();
	var personName=reviewform.personName.value;
	var emailId=reviewform.emailAddress.value;
	var review=reviewform.review.value;
	var comments=reviewform.comments.value;
	var productId=reviewform.productId.value;
	var productStoreId=9000;
	var ratedvalue;
	jQuery('#personName-error').hide();
	jQuery('#emailAddress-error').hide();
	jQuery('#review-error').hide();
	jQuery('#comments-error').hide();
	
	jQuery("#personName").removeClass("inputsmlerror");
	jQuery("#emailAddress").removeClass("inputsmlerror");
	jQuery("#review").removeClass("inputsmlerror");
	jQuery("#comments").removeClass("inputsmlerror");
	var rating = document.getElementsByName("adv");
    for (var i = 0; i < rating.length; i++) {       
        if (rating[i].checked) {
        	ratedvalue=rating[i].value;
            break;
        }
    }
	if(false == validatePersonName()){jQuery("#reviewLoader").hide();jQuery("#reviewsubmit").show();return false;}
	if(false == validateEmailid()){jQuery("#reviewLoader").hide();jQuery("#reviewsubmit").show();return false;}
	if(false == validateReview()){jQuery("#reviewLoader").hide();jQuery("#reviewsubmit").show();return false;}
	if(false == validateComments()){jQuery("#reviewLoader").hide();jQuery("#reviewsubmit").show();return false;}
	if(false == validateReviewRating()){jQuery("#reviewLoader").hide();jQuery("#reviewsubmit").show();return false;}
	
	 $.post("/control/ProductReviewCreation", 
        {"personName":personName,"emailAddress":emailId,"review":review,"comments":comments,"adv":ratedvalue,"productId":productId,"productStoreId":productStoreId}, function(data) {
        	reviewform.personName.value="";
        	reviewform.emailAddress.value="";
        	reviewform.review.value="";
	        reviewform.comments.value="";
	        jQuery("#personName").removeAttr("disabled"); 
	        jQuery("#emailAddress").removeAttr("disabled");
	        jQuery("#radio1").removeClass("star-rating-on");
	        jQuery("#radio2").removeClass("star-rating-on");
	        jQuery("#radio3").removeClass("star-rating-on");
	        jQuery("#radio4").removeClass("star-rating-on");
	        jQuery("#radio5").removeClass("star-rating-on");
	        
	        jQuery('#rating-error').hide();
	        jQuery("#reviewLoader").hide();
	        jQuery("#reviewsubmit").show();
	        jQuery("#reviewsubmitnote").show();
	        jQuery("#reviewsubmitnote").delay(10000).fadeOut(5000);
    });
}
function validateReviewRating()
{         
	var rating = document.getElementsByName("adv");
	   for(var i=0;i<rating.length;i++){
	      var reviewRating=rating[i];
		  if(reviewRating.checked){
		  	     return true;
		  }
	    }
	document.getElementById('rating-error').innerHTML="Select Rating";
	return false;
    
}
function validatePersonName()
{ 
     var nameregx=/^[a-zA-Z]+([a-zA-Z\s]{0,50})$/;         
	 personName=reviewform.personName.value;
	 jQuery("#personName").removeClass("inputsmlerror");
    if(personName==""){	 
			document.getElementById('personName-error').innerHTML="Name required";
			jQuery('#personName-error').show();
			jQuery("#personName").addClass("inputsmlerror");
			return false;
    }else if(nameregx.test(personName)==false){
		   document.getElementById('personName-error').innerHTML="Only Alphabets are Allowed";
		   jQuery('#personName-error').show();
		   jQuery("#personName").addClass("inputsmlerror");
		   return false;
	}
}
function validateEmailid(){				
	var emaildregx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	emailId=reviewform.emailAddress.value;
	jQuery("#emailAddress").removeClass("inputsmlerror");
	if(emailId=="")	{
		  document.getElementById('emailAddress-error').innerHTML="EmailId cannot be Empty";
		  jQuery('#emailAddress-error').show();
		  jQuery("#emailAddress").addClass("inputsmlerror");
		  return false;
	}else if(emaildregx.test(emailId) == false)	{
          document.getElementById('emailAddress-error').innerHTML="InValid EmailId";
          jQuery('#emailAddress-error').show();
          jQuery("#emailAddress").addClass("inputsmlerror");
           return false;
    }
}
function validateReview()
{ 
	 var reviewregx=/^[a-zA-Z]+([0-9a-zA-Z.,-_ \s]{0,100})+$/;
	 review=reviewform.review.value;
	 jQuery("#review").removeClass("inputsmlerror");
    if(review==""){
			document.getElementById('review-error').innerHTML="Review Title cannot be Empty";
			jQuery('#review-error').show();
			jQuery("#review").addClass("inputsmlerror");
			return false;
    }else if(reviewregx.test(review)==false){
			document.getElementById('review-error').innerHTML="Enter review corectly";
			jQuery('#review-error').show();
			jQuery("#review").addClass("inputsmlerror");
			return false;
	}
    else if(review.length > 100)	{
	     document.getElementById('review-error').innerHTML="You have exceeded the limit.(100 characters)";
	     jQuery('#review-error').show();
	     jQuery("#review").addClass("inputsmlerror");
		 return false;
	}
}			
function validateComments()
{         
	 var commentregx=/^[a-zA-Z]+([0-9a-zA-Z.,-_""'':\s]{0,5000})+$/; 
	comments=reviewform.comments.value;
	jQuery("#comments").removeClass("inputsmlerror");
    if(comments=="") {
         document.getElementById('comments-error').innerHTML="Review should not be Empty";
         jQuery('#comments-error').show();
         jQuery("#comments").addClass("inputsmlerror");
		 return false;
    }else if(comments.length > 5000)	{
	     document.getElementById('comments-error').innerHTML="You have exceeded the limit.(5000 characters)";
	     jQuery('#comments-error').show();
	     jQuery("#comments").addClass("inputsmlerror");
		 return false;
	}else if(commentregx.test(comments)==false){
	     document.getElementById('comments-error').innerHTML="Enter  Review Correctly";
	     jQuery('#comments-error').show();
	      jQuery("#comments").addClass("inputsmlerror");
		return false;
	}
}

function reviewyes(id,reviewid) {
	var yes=jQuery("#Yes"+reviewid).val();
	var boolean="Yes";
	jQuery.ajax({
		url:"/control/ReviewStoreCountValue?boolean="+boolean+"&productId="+id+"&reviewId="+reviewid,
		type: 'GET',
		success: function(json){
			var newcount=json.count+"Votes";
			jQuery('#yesActive'+reviewid).attr('title',newcount);
		}
		});
	jQuery("#yesActive"+reviewid).addClass("active");
	jQuery("#reviewcontent_"+reviewid).hide();
	jQuery("#reviewcontenthide_"+reviewid).show();
	jQuery("#thankxnote"+reviewid).delay(10000).fadeOut(5000);
}
function reviewno(id,reviewid) {
	var no=jQuery("#No"+reviewid).val();
	var boolean="No";
	jQuery.ajax({
		url:"/control/ReviewStoreCountValue?boolean="+boolean+"&productId="+id+"&reviewId="+reviewid,
		type: 'GET',
		success: function(json){
			var newcount=json.count+"Votes";
			jQuery('#noActive'+reviewid).attr('title',newcount);
		}
		});
	jQuery("#noActive"+reviewid).addClass("active");
	jQuery("#reviewcontent_"+reviewid).hide();
	jQuery("#reviewcontenthide_"+reviewid).show();
	jQuery("#thankxnote"+reviewid).delay(10000).fadeOut(5000);
}



/*newProductDetail.ftl,productRating.ftl files  js ends*/


