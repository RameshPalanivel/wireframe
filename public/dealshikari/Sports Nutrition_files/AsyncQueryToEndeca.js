function OnLeftNavItemClicked(sUrl, name, isBackButtonPressed) {
    // isBackButtonPressed is by default false [when it is being called from c# code].
    // updatePartialPage() will call this method with isBackButtonPressed as true [when the back button is pressed in the browser]
    if (!isBackButtonPressed && IsSingleNValue(sUrl)) {
        window.location.href = GetTopCategoryUrl();
        return;
    }

    if (siteID == 0) {
		jQuery("#ajaxloader").css({ "display": "block", "opacity": "1" });
    }

    var lUrl = (sUrl.indexOf("?") > -1) ? sUrl.substring(sUrl.indexOf("?")) : sUrl.substring(sUrl.indexOf("/"));
    lnurl = lUrl;

    try {
        if (name) {
            s.eVar30 = name;
            s.tl();
        }
    }
    catch (e) { }
    
    if (isAllowSetLocationHash)
        setLocationHash(lUrl);
    
    $.get('/templates/gn/AsyncCallToEndeca.asp' + lUrl + '&isasync=y', function (data) {
	    if (siteID == 1) {
		    updatePage(data);
	    } else {
		    updatePageDSCM(data);
	    	
	    }
    });

    isAllowSetLocationHash = true;
}

function IsSingleNValue(sUrl) {
    var lowerUrl = sUrl.toLowerCase();
    var querystringparams = lowerUrl.split('&');
    var nvalue = '';
    for (var idx = 0; idx < querystringparams.length; idx++) {
        var keyvaluepair = querystringparams[idx].split('=');
        if (keyvaluepair.length > 0) {
            if (keyvaluepair[0] == 'n') {
                nvalue = keyvaluepair.length > 1 ? keyvaluepair[1] : '';
                break;
            }
        }
    }
    
    nvalue = trim(unescape(nvalue));
    
    if (nvalue.indexOf(' ') < 0) {
        return true;
    } else {
        if (nvalue.split(' ').length <= 1) {
            return true;
        }
    }

    return false;
}

function GetTopCategoryUrl() {
    var topcaturl = window.location.href.split('#')[0];
    // to handle sorting, first check the availability of querystring values.
    // if found, get topcaturl by GetTopCategoryUrlFromNonCloakedUrl() method
    if (topcaturl.indexOf('?') >= 0) {
        topcaturl = GetTopCategoryUrlFromNonCloakedUrl(GetUrlWithZeroNValue());
    } else {
        var dashposition = topcaturl.lastIndexOf('-');
        if (dashposition != -1) {
            topcaturl = topcaturl.substring(0, dashposition + 1) + '0';
        }
    }
    return topcaturl;
}

function GetUrlWithZeroNValue() {
    var locationUrl = window.location.href.split('#');
    var urlWithZeroNValue = '';
    if (locationUrl.length > 0) {
        urlWithZeroNValue = unescape(locationUrl[0]);
        if (urlWithZeroNValue.indexOf('?') >= 0) {
            var urlpart = urlWithZeroNValue.split('?');
            var dashposition = urlpart[0].lastIndexOf('-');
            if (dashposition != -1) {
                urlWithZeroNValue = urlpart[0].substring(0, dashposition + 1) + '0' + '?' + urlpart[1];
            }
        }
    }
    return unescape(urlWithZeroNValue);
}

function GetTopCategoryUrlFromNonCloakedUrl(surl) {
    var urlparts = surl.split('?');
    var querystrings = urlparts[1].split('&');
    var topcaturl = urlparts[0] + '?';

    for (var idx = 0; idx < querystrings.length; idx++) {
        var qs = querystrings[idx].toLowerCase();
        if (qs.split('=')[0] === 'n') {
            topcaturl += (idx === 0 ? 'N=0' : '&N=0');
        } else {
            topcaturl += (idx === 0 ? querystrings[idx] : '&' + querystrings[idx]);
        }
    }

    return topcaturl;
}

function OnLeftNavLastItemClickedDscm(sUrl) {
	
    jQuery("#ajaxloader").css({ "display": "block", "opacity": "1" });
    // to handle sorting, first check for qurystring values availability
    // if found user the url from GetTopCategoryUrlFromNonCloakedUrl(), otherwise use the input parameter.
    var locationUrl = window.location.href.split('#');
    if (locationUrl.length > 0) {
        var url = unescape(locationUrl[0]);
        if (url.indexOf('?') >= 0) {
            var urlpart = url.split('?');
            var dashposition = urlpart[0].lastIndexOf('-');
            if (dashposition != -1) {
                url = urlpart[0].substring(0, dashposition + 1) + '0' + '?' + urlpart[1];
            }
            var currentUrl = GetTopCategoryUrlFromNonCloakedUrl(unescape(url));
            var currentUrlLowerCase = trim(currentUrl).toLowerCase();
            window.location.href = (currentUrlLowerCase.indexOf("ns=") >= 0) ? currentUrl : sUrl;
        } else {
            window.location.href = sUrl;
        }
    } else {
        var querystring = '';
        if (locationUrl[0].indexOf('?') >= 0) {
            var urlparts = locationUrl[0].split('?');
            if(urlparts.length>1)
            querystring = '?' + urlparts[1];
        }
        window.location.href = sUrl + querystring;
    }
}

var lnurl = '';

/* Persisting selected leftnav item's state  - start */
var allowHashToUpdateApp = true;
var isAllowSetLocationHash = true;

$(document).ready(function () {
    var curUrl = window.location.href;
    if (isValidHash(curUrl)) {            
        updatePartialPage(curUrl.split('#')[1]);
    }
});

window.onhashchange = function (e) {
    if (allowHashToUpdateApp) {
        var hash = getLocationHash();
        if (isValidHash(hash) || hash.length == 0) {
            var hashval = hash.length == 0 ? '' : hash.substring(1);
            updatePartialPage(hashval);
        }
    } else {
        allowHashToUpdateApp = true;
    }
};

function isValidHash(hash) {
    return (hash.indexOf("#?catid=") > -1);
}

function setLocationHash(str) {
    allowHashToUpdateApp = false;
    window.location.hash = str;
}

function getLocationHash() {
    var lurl = window.location.href;

	if (lurl.indexOf('#') == lurl.length - 1) {
        return "invalid hash";
    }
    
    return window.location.hash.substring(0);    
}

function updatePartialPage(value) {
    if (value.length) {
        isAllowSetLocationHash = false;
        OnLeftNavItemClicked(value, true, true);
    }
    else {
        var curUrl = window.location.href;
        getPage(curUrl + (curUrl.indexOf('?') >= 0 ? "&" : "?") + "isPartial=y");
    }
}

function getPage(sUrl) {
    $.get(sUrl, function (data) {
        if (siteID == 1) 
            updatePage(data);
         else 
            updatePageDSCM(data);
    });
}
/* Persisting selected leftnav item's state  - end */

function updatePage(items) {
    try {

        var maindiv = document.getElementById('main');
        if (maindiv && maindiv.className == 'container') {
            maindiv.innerHTML = items;

            jQuery('.collapse-scroll-pane').jScrollPane(
		            { autoReinitialise: false, contentWidth: 137 }
	        );

            var cmbprodSortddl = document.getElementById('cmbProdSort');
            if (cmbprodSortddl) {
                var selectedVal = jQuery('#cmbProdSort option:selected').text();
                jQuery('#spanProdSort').html(selectedVal);
            }

            if (jQuery('#BRAND-collapse').length) {

                if (jQuery('.jspVerticalBar', '#BRAND-collapse').length) {

					var jspCntrHt = jQuery('.jspContainer', '#BRAND-collapse').height();
                    var jspTrackHt = jQuery('.collapse-scroll-pane', '#BRAND-collapse').height();

                    if (jspCntrHt <= 46) { // to avoid rendering vertical scroll bar when there is 2 brands in brands collection
                        jQuery('.jspVerticalBar', '#BRAND-collapse').css('display', 'none');
                    }

                    if (jspTrackHt < 274) { jQuery('.jspVerticalBar', '#BRAND-collapse').css('display', 'none') }
                }
            }
        }

        var head = document.getElementsByTagName('link');

        if (head.length > 0) {
            var prevlinkelement = null;

            for (var i = 0; i < head.length; i++) {
                if (head.item(i).getAttribute("rel") == 'next') {
                    var href = head.item(i).getAttribute("href");

                    var lnurlArray = lnurl.replace('%20', ' ').split('&');

                    var nvalue = '';
                    for (var paramidx = 0; paramidx < lnurlArray.length; paramidx++) {
                        if (lnurlArray[paramidx].indexOf('N=') >= 0) {
                            nvalue = lnurlArray[paramidx];
                            break;
                        }
                    }

                    var hrefurlArray = href.split('&');
                    var hrefnvalue = '';
                    var hrefippvalue = '';
                    var hrefnaovalue = '';
                    var hrefitvalue = '';

                    for (var paramidx = 0; paramidx < hrefurlArray.length; paramidx++) {

                        if (hrefurlArray[paramidx].indexOf('N=') >= 0) {
                            hrefnvalue = hrefurlArray[paramidx].substring(hrefurlArray[paramidx].indexOf('N='));
                        }

                        if (hrefurlArray[paramidx].indexOf('ipp=') >= 0) {
                            hrefippvalue = hrefurlArray[paramidx].substring(hrefurlArray[paramidx].indexOf('ipp='));
                        }

                        if (hrefurlArray[paramidx].indexOf('Nao=') >= 0) {
                            hrefnaovalue = hrefurlArray[paramidx].substring(hrefurlArray[paramidx].indexOf('Nao='));
                        }

                        if (hrefurlArray[paramidx].indexOf('it=') >= 0) {
                            hrefitvalue = hrefurlArray[paramidx].substring(hrefurlArray[paramidx].indexOf('it='));
                        }
                    }

                    if (hrefnvalue != '') {
                        href = href.replace(hrefnvalue, trim(nvalue));
                    }

                    if (hrefitvalue != '') {
                        if (href.charAt(href.indexOf('it=') - 1) == '&') {
                            href = href.replace('&' + hrefitvalue, '');
                        }
                        else if (href.charAt(href.indexOf('it=') - 1) == '?') {
                            href = href.replace(hrefitvalue + '&', '');
                        }
                        else {
                            href = href.replace(hrefitvalue, '');
                        }
                    }

                    if (hrefippvalue != '') {
                        href = href.replace(hrefippvalue, 'ipp=18');
                    }
                    else {
                        href += '&ipp=18';
                    }

                    if (hrefnaovalue != '') {
                        href = href.replace(hrefnaovalue, 'Nao=18');
                    }
                    else {
                        href += '&Nao=18';
                    }

                    head.item(i).setAttribute("href", href);
                    href = head.item(i).getAttribute("href");
                }

                if (head.item(i).getAttribute("rel") == 'prev') {
                    prevlinkelement = head.item(i);
                }
            }

            if (prevlinkelement != null) {
                prevlinkelement.parentNode.removeChild(prevlinkelement);
            }
        }

        //move to top of the window
        window.scrollTo(0, 0);

    }
    catch (e) { }
}

function updatePageDSCM(items) {
	try {
		var maindiv = document.getElementById('tblbodycontent');
		if (maindiv && maindiv.className == 'bodycontent') {
			maindiv.innerHTML = items;
			$('img.lazy').lazyload({ threshold: 30 });
			var rrdiv = document.getElementById('richrel');
			if (rrdiv) {
				rrdiv.innerHTML = "<div id='rr_placement_0'></div>";
				if (rr_placement_place_holders.length == 0) {
					rr_placement_place_holders[rr_placement_place_holders.length] = "category_page.rr1";//set the placeholder on category page 
				}
				rr_recs.placements[0].used = false;      //this resets the used flag on the a placement to false
				rr_flush(); //This runs the insertion process again.
				$('img.lazy').lazyload({ threshold: 30 });
				GetGoogleAds();//to trigger google adsense again.
				var footerTable = $('#TblFtrDept');
				if (!footerTable.length) {
					$('.googleAdsense').css('margin-top', '25px');
				}
			}
		}
		//move to top of the window
		window.scrollTo(0, 0);
    }
    catch (e) { }

}

function trim(strvalue) { return strvalue.toString().replace(/\s+/g, " ").replace(/^\s+|\s+$/g, ""); }

function OnColorFamilyHover(obj) {
    var parentDivElement = obj;
    parentelementStyle = obj.className;

    if (parentelementStyle != 'selectedColorAttribute') {
        obj.className = 'onHoverSelectedColorAttribute';
    }
}

function OnColorFamilyHoverOut(obj) {
    var parentDivElement = obj;
    parentelementStyle = obj.className;

    if (parentelementStyle != 'selectedColorAttribute') {
        obj.className = 'colorAttribute';
    }
}

function OnLeftNavItemClickedInSearchResult(name, Url) {
    try {
		if (name) {
        s.eVar30 = name;
        s.tl();
		}

        if (siteID == 0) {
	        document.location.href = Url;
        } 
    }
    catch (e) { }

	if (siteID != 0)
    return true;
}
