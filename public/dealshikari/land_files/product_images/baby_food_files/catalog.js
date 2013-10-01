
// -----------------categorydetail.ftl -------------

var ofbizUrlOpen = '<@ofbizUrl>'; //jQuery('#ofbizUrlOpen').val();
var ofbizUrlSecureOpen = '<@ofbizUrl secure="${request.isSecure()?string}">'; //jQuery('#ofbizUrlSecureOpen').val();
var ofbizUrlClose = '</@ofbizUrl>'; //jQuery('#ofbizUrlClose').val();

(function() {
    function async_load(){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'http://ads.ozonemedia.com/seg?add=267390&t=1';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }
    if (window.attachEvent)
        window.attachEvent('onload', async_load);
    else
        window.addEventListener('load', async_load, false);
})();


$(document).scroll("slow");
				// using some custom options
				$(document).scroll({
				fireOnce: false,
				fireDelay: false,
				loader: "<div class=\"loading\"><div>",
				callback: function(p){
				}
			});


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


		
		
//------------------------ newProductDetail.ftl -----------

function changeVariantOnly(productId,internalName,loyaltyPoints,totalSavings,mrp,qty,productPrice,colorName,colorCode,i,isInventoryOpen,offerDetails,animateop){
		document.getElementById('loyaltyPointsPDDiv').className="hidden";
		document.getElementById('totalSavingsPDDiv').className="hidden";
		document.getElementById('priceReducedDiv').className = "hidden";
		document.getElementById('colorBoxonImage').className = "hidden";
		if(colorCode.length>0){
		document.getElementById('colorName').className="hidden";
		document.getElementById('colorBoxonImage').className="box";
		document.getElementById('colorBoxonImage').setAttribute('style','background:'+colorCode+';');
		}
		document.getElementById('mrp-strike').className="";
		document.getElementById('offerVariant').className="hidden";
		document.getElementById('additionalOffers').className="hidden";
		document.getElementById('skuId').innerHTML=productId;
		document.getElementById('variantName').innerHTML = internalName;
		if(loyaltyPoints.length>0){
			document.getElementById('loyaltyPointsPDDiv').className="col9 omega alpha left padding-r padding-t";
			document.getElementById('loyaltyPointsPD').innerHTML=loyaltyPoints;
		}
		if(totalSavings.length>0){
			document.getElementById('totalSavingsPDDiv').className="col9 omega alpha left padding-r padding-t";
			document.getElementById('totalSavingsPD').innerHTML=totalSavings;
		}
		if(colorName.length>0 && colorCode.length>0){
			document.getElementById('colorName').className="color-black";
			document.getElementById('colorName').innerHTML='<strong>'+colorName+'</strong>';
		}
		if(productPrice.length>0){
			document.getElementById('productPrice').innerHTML=productPrice;
		}
		if(offerDetails.length>2){
			document.getElementById('offerVariant').className="";
			document.getElementById('additionalOffers').className="col9 omega alpha left padding-r padding-t-b";
			document.getElementById('offerVariant').innerHTML=offerDetails.substring(1,offerDetails.length-1).replace("|",", ");
		}
		document.getElementById('mrp').innerHTML=mrp;
		if(mrp == productPrice){
			document.getElementById('mrp').innerHTML='';
			document.getElementById('mrp-strike').className="hidden";
		}
		if(qty=='Y'||isInventoryOpen=='true'){
			document.getElementById('prodOutOfStock').className = "hidden"
			document.getElementById('prodAvail').className = "color-blue"
			document.getElementById('notifymeGrid').className="hidden";
			document.getElementById('addToBagGrid').className='col9 omega alpha margin-t-b';
		}else{
			document.getElementById('prodAvail').className = "hidden"
			document.getElementById('prodOutOfStock').className="color-org"
			document.getElementById('addToBagGrid').className="hidden";
			document.getElementById('notifymeGrid').className='col9 omega alpha margin-t-b';
		}
		if(colorCode.length>0){
			var nodes = jQuery('.activeclr');
	        for(i=0;i<nodes.size();i++){
	            nodes[i].className='';
	        }
	        document.getElementById(productId+'-v').innerHTML='<span class="activeclr">&nbsp;</span>';
	    }
	    document.getElementById('hiddenProductIdPD').value=productId;
	    if((mrp-productPrice)>0 && (productPrice!=0)){
	    	document.getElementById('priceReducedDiv').className = "col9 omega alpha left padding-r padding-t";
	    	document.getElementById('priceReduced').innerHTML = (mrp-productPrice).toFixed(2); 
	    }
	    else{
	    	document.getElementById('priceReducedDiv').className = "hidden";
	    	
	    }
	    if(animateop=='Y' ){
	    	jQuery('html, body').animate({ scrollTop: jQuery('#header').offset().top}, 'slow');
	    }
	}
	function changeSizeVariant(productInfoStr){
		document.getElementById('loyaltyPointsPDDiv').className="hidden";
		document.getElementById('totalSavingsPDDiv').className="hidden";
		document.getElementById('priceReducedDiv').className="hidden";
		document.getElementById('mrp-strike').className="";
		document.getElementById('offerVariant').className="hidden";
		document.getElementById('additionalOffers').className="hidden";
		if (jQuery('#offerVariant').length > 0) {
 			document.getElementById('offerVariant').className="hidden";
		}
		var eachInfo = productInfoStr.split(":");
		document.getElementById('skuId').innerHTML=eachInfo[0];
		document.getElementById('variantName').innerHTML='<strong>' + eachInfo[5] + '</strong>';
		
		if(eachInfo[6].length>0){
			document.getElementById('loyaltyPointsPDDiv').className="col9 omega alpha left padding-r padding-t"
			document.getElementById('loyaltyPointsPD').innerHTML=eachInfo[6];
		}
		if(eachInfo[7].length>0){
			document.getElementById('totalSavingsPDDiv').className="col9 omega alpha left padding-r padding-t"
			document.getElementById('totalSavingsPD').innerHTML=eachInfo[7];
		}if(eachInfo[4].length>2){
			document.getElementById('offerVariant').className="";
			document.getElementById('additionalOffers').className="col9 omega alpha left padding-r padding-t-b";
			document.getElementById('offerVariant').innerHTML=eachInfo[4].substring(1,eachInfo[4].length-1).replace("|",", ");
		}
		document.getElementById('mrp').innerHTML=eachInfo[8];
		if(eachInfo[3].length>0){
			if(eachInfo[3] < 0.1){
				document.getElementById('productPrice').innerHTML=eachInfo[8];
		       	document.getElementById('mrp').innerHTML='';
		       	document.getElementById('mrp-strike').className="hidden";
			}else if(eachInfo[3] == eachInfo[8]){
		       document.getElementById('productPrice').innerHTML=eachInfo[3];
		       document.getElementById('mrp').innerHTML='';
		       document.getElementById('mrp-strike').className="hidden";
		    }else{
		       document.getElementById('productPrice').innerHTML=eachInfo[3];
		       document.getElementById('priceReducedDiv').className = "col9 omega alpha left padding-r padding-t";
	    	   document.getElementById('priceReduced').innerHTML = (eachInfo[8]-eachInfo[3]).toFixed(2);
		    }
		}
		if(eachInfo[9]=='Y'||eachInfo[10]=='true'){
			document.getElementById('prodOutOfStock').className = "hidden"
			document.getElementById('prodAvail').className = "color-blue"
			document.getElementById('notifymeGrid').className="hidden";
			document.getElementById('addToBagGrid').className='col9 omega alpha margin-t-b';
		}else{
			document.getElementById('prodAvail').className = "hidden"
			document.getElementById('prodOutOfStock').className="color-org"
			document.getElementById('addToBagGrid').className="hidden";
			document.getElementById('notifymeGrid').className='col9 omega alpha margin-t-b';
		}
		document.getElementById('hiddenProductIdPD').value=eachInfo[0];
	}
	function changeView(viewType){
		if(viewType=='gridView'){
			document.getElementById('gridView').className='border-top margin-t padding-t';
			document.getElementById('listView').className='hidden';
			document.getElementById('addToWishListGrid').style.visibility='visible';
			document.getElementById('sizeVariantsDiv').style.visibility='visible';
			var aaaaa=document.getElementById("sizeVariantsPD");
			if(aaaaa != null){
	    	changeSizeVariant(aaaaa.value);
	    	}
			
		}else{
			jQuery(".bgclr-blu").removeClass("bgclr-blu");
			document.getElementById('gridView').className='hidden';
			document.getElementById('listView').className='col16 margin-b';
			document.getElementById('addToWishListGrid').style.visibility='hidden';
			document.getElementById('sizeVariantsDiv').style.visibility='hidden';
			changeByListView("listvy-1",1,0,'N');
		}
	}
	
	var notifyWhenAvailable = jQuery("#notifyWhenAvailable").val();
	function fun_notifyMe(productId,rowCount){
		var idntf="PD";
		if(rowCount=="normPro"){
			idntf=rowCount;
		}else if(rowCount=="grid"){
			idntf=rowCount;
		}
		jQuery('#product_Id').val(jQuery('#hiddenProductIdPD').val());
		jQuery('#emailAddressTo').val(jQuery('#usermailfornotify_'+rowCount).val());
		jQuery("#btnnotifyMePD").hide();
        jQuery("#notifymeloader").show();
		jQuery.ajax({
        url: '/control/notifyWhenAvailable',
        type: 'POST',
        data: eval("jQuery('#availableForm').serialize()"),
        success: function(json) {
            var msg;
            if (json._EVENT_MESSAGE_ != undefined) {
            msg = json._EVENT_MESSAGE_;
               jQuery('#successPanel'+idntf).show();
             }
             if (json._ERROR_MESSAGE_ != undefined) {
                msg = json._ERROR_MESSAGE_;
                jQuery('#errorPanel'+idntf).show();
             }
             if (json._ERROR_MESSAGE_LIST_  != undefined) {
                msg = json._ERROR_MESSAGE_LIST_ ;
              jQuery('#infoPanel'+idntf).show(function(){
              });
             }
             jQuery('#usermailfornotify_'+rowCount).val('');
        },
        complete: function(){
                    	  jQuery("#btnnotifyMePD").show();
                		  jQuery("#notifymeloader").hide();
                    }
    });
	}
	function addCatProductDetail(formName,productId,type) {
			var qty;
			var productId;
			jQuery('html, body').animate({ scrollTop: jQuery('#header').offset().top}, 'slow');
			if(type=="grid"){
				qty = document.addToCartDetailGrid.quantityPD.value;
				productId = document.addToCartDetailGrid.hiddenProductIdPD.value;
				jQuery('#btnAddToBagPD').attr("disabled", true);
            var res = new RegExp(/^[0-9]+$/);
            if(res.test(qty)){
                jQuery('#popuperror').hide();
                 jQuery("#btnAddToBagPD").hide();
                jQuery("#addtobagloader").show();
                jQuery.ajax({
                    url: '/control/addCatProducts?add_product_id='+productId,
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
                        jQuery('#btnAddToBagPD').attr("disabled", true);
                        if (errMsg != undefined) {
                             jQuery('#btnAddToBagPD').attr("disabled", false);
                            qty="0";
			    			document.addToCartDetailGrid.quantityPD.value='0';
                            jQuery('#errorPopup').show().html(errMsg.toString());
                            jQuery.noConflict();
    							errormsgbody();
                        }else {
                            jQuery.ajax({
                                url: '/control/refreshHeader',
                                type: 'POST',
                                cache: false,
                                success: function(json) {
                                jQuery('#successPopup').show().html("Product added to Cart");
								document.getElementById('successPopup').innerHTML = "Product added to Cart";
								jQuery.noConflict();
                                jQuery('#aravind').val(json);
                                jQuery('#refreshLinks').html(json);
                                jQuery("#cartBox").slideDown(500);
                                jQuery('#btnAddToBagPD').attr("disabled", false);
                                jQuery("#cartContainer").removeClass();
                                jQuery("#cartBox").attr("style","display:block;");
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
                jQuery('#btnAddToBagPD').attr("disabled", false);
                jQuery('#errorPopup').show().html("Invalid quantity");
                jQuery.noConflict();
    			errormsgbody();
			document.addToCartDetailGrid.quantityPD.value='0';
            }
			}else{
				var dynamicFormName = 'document.addToCartDetail'+productId;
        		var dynamicQuantity = document.getElementById('quantity'+productId);
        		qty = dynamicQuantity.value;
        		jQuery('#btnAddToBagPD').attr("disabled", true);
            var res = new RegExp(/^[0-9]+$/);
            if(res.test(qty)){
                jQuery('#popuperror').hide();
                jQuery.ajax({
                    url: '/control/addCatProducts?quantity='+qty+'&add_product_id=',
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
                        jQuery('#btnAddToBagPD').attr("disabled", true);
                        if (errMsg != undefined) {
                             jQuery('#btnAddToBagPD').attr("disabled", false);
                            qty="0";
							dynamicQuantity.value='0';
                            jQuery('#errorPopup').show().html(errMsg.toString());
                            jQuery.noConflict();
    						errormsgbody();
                        }else {
                            jQuery.ajax({
                                url: '/control/refreshHeader',
                                type: 'POST',
                                cache: false,
                                success: function(json) {
                                jQuery('#refreshLinks').html(json);
                                jQuery('#btnAddToBagPD').attr("disabled", false);
								dynamicQuantity.value='0';
								jQuery('#successPopup').show().html("PRoduct Added To Cart");
								jQuery.noConflict();
				    			successmsgbody();      
                                }
                            });
                        }
                    }
                });
            } else {
                jQuery('#btnAddToBagPD').attr("disabled", false);
                jQuery('#errorPopup').show().html("Invalid quantity");
				dynamicQuantity.value='0';
            }
	    }
        }
     function fn_gotoVirtualStudio(){
        window.location="/control/virtualmakeup?productId="+ document.getElementById('hiddenProductIdPD').value;
    }

function changeByListView(eachList,listCount,listsize,animateop){
	for(i=1;i<=listsize;i++){
		jQuery('#listviewdiv'+i).removeClass('bgclr-blu');
	}
	jQuery('#listviewdiv'+listCount).addClass('bgclr-blu');
    if(document.getElementById(eachList).value!=null){
 		var variants=document.getElementById(eachList).value.split(":");
 		changeVariantOnly(variants[0],variants[5],variants[6],variants[7],variants[8],variants[9],variants[3],variants[1],variants[2],listCount,variants[10],variants[4],animateop);
  }
}

