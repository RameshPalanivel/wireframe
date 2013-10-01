// dsLib - the common JavaScript library (global)
// Contains an AJAX library and other libraries yet to be defined
// To do: create a loader for the dsLib and dynamic method to load other libraries to this at runtime

var dsLib = new Object(); // Common object
dsLib.AJAX = new Object(); // AJAX objects
dsLib.JS = new Object(); // All other javascript objects

dsLib.AJAX.READY_STATE_UNINITIALIZED = 0;
dsLib.AJAX.READY_STATE_LOADING = 1;
dsLib.AJAX.READY_STATE_LOADED = 2;
dsLib.AJAX.READY_STATE_INTERACTIVE = 3;
dsLib.AJAX.READY_STATE_COMPLETE = 4;

dsLib.AJAX.Request = function (url, callback, onError, requestMethod, requestArgs, contentType, async) {

    this.request = null;
    this.responseXML = null;
    this.responseText = null;
    this.callback = callback;
    this.onError = (onError) ? onError : this.defaultError;
    this.loadXMLDoc(url, requestMethod, requestArgs, contentType, async);
}

dsLib.AJAX.Request.prototype.loadXMLDoc = function (url, requestMethod, requestArgs, contentType, async) {
    if (!requestMethod)
        requestMethod = 'GET';

    if (!contentType && requestMethod == "POST")
        contentType = 'application/x-www-form-urlencoded';

    if (async == null)
        async = true;

    if (window.XMLHttpRequest) {
        this.request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        this.request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (this.request) {
        try {
            var loader = this;
            if (async == true) {
                this.request.onreadystatechange = function () {
                    dsLib.AJAX.Request.onReadyState.call(loader);
                }
            }

            this.request.open(requestMethod, url, async);

            if (contentType)
                this.request.setRequestHeader('Content-Type', contentType);

            this.request.send(requestArgs);

            if (async == false) //FF does not fire onreadystate event handler for synchronous calls
            {
                dsLib.AJAX.Request.onReadyState.call(loader);
            }
        }
        catch (err) {
            this.onError.call(this);
        }
    }
}

dsLib.AJAX.Request.onReadyState = function () {
    var request = this.request;
    var ready = request.readyState;
    if (ready == dsLib.AJAX.READY_STATE_COMPLETE) {
        var httpStatus = request.status;
        if (httpStatus == 200 || httpStatus == 0) {
            this.responseXML = this.request.responseXML;
            this.responseText = this.request.responseText;
        } else {
            this.onError.call(this);
        }
    }
}

dsLib.AJAX.Request.prototype.defaultError = function () {
    // Need error handling for production use

    //alert("error fetching data!"
    //  +"\n\nreadyState:"+this.request.readyState
    //  +"\nstatus: "+this.request.status
    //  +"\nheaders: "+this.request.getAllResponseHeaders());
}

//===============End of AJAX Scripts=======

//================Start of TabModule Scripts =============//
dsLib.JS.TabScriptMgr = function () {
    this.TabConfigs = new KeyValueCollection();
    this.ModuleIdField = null;
}

dsLib.JS.TabScriptMgr.prototype.AddTabConfig = function (p_oTab, p_oConfig) {
    try {
        this.TabConfigs.Add(p_oTab.name, p_oConfig);
        var loader = this;
        p_oTab.onclick = function () { dsLib.JS.TabScriptMgr.RenderTabContent.call(loader); }
    }
    catch (e) { }
}

dsLib.JS.TabScriptMgr.RenderTabContent = function () {
    try {
        var l_szURL, l_oModuleProp, l_oContentPanel, l_szJoinModuleProps, l_oTab, p_oTab, p_oTabConfig;
        p_oTab = null;
        p_oTabConfig = null;

        var e = window.event || arguments.callee.caller.arguments[0];
        p_oTab = e.srcElement || e.target;

        if (this.TabConfigs.Exists(p_oTab.name)) {
            p_oTabConfig = this.TabConfigs.Item(p_oTab.name);
        }
        if (p_oTab && p_oTabConfig) {
            l_oContentPanel = document.getElementById(p_oTabConfig.ContentPanelId);

            if (l_oContentPanel && p_oTabConfig.WebServiceURL != "") {
                // request only when the content is not available
                if (l_oContentPanel.innerHTML == "") {
                    l_szURL = p_oTabConfig.WebServiceURL;
                    if (l_szURL.indexOf("?") < 0) {
                        l_szURL = l_szURL + "?catid=" + p_oTabConfig.CatId;
                    }
                    else {
                        l_szURL = l_szURL + "&catid=" + p_oTabConfig.CatId;
                    }

                    l_szURL = l_szURL + "&brandid=" + p_oTabConfig.BrandId;
                    l_szURL = l_szURL + "&modid=" + p_oTabConfig.ModuleId;
                    l_szURL = l_szURL + "&type=module"
                    l_szURL = l_szURL + "&ct=text/html"
                    l_szJoinModuleProps = ""
                    for (i = 0; i < p_oTabConfig.ModuleProps.Items.length; i++) {
                        l_oModuleProp = p_oTabConfig.ModuleProps.Items[i];
                        l_szJoinModuleProps = l_szJoinModuleProps + l_oModuleProp.Key + "$" + l_oModuleProp.Value + "~";
                    }
                    if (l_szJoinModuleProps.length) {
                        l_szURL = l_szURL + "&customprops=" + l_szJoinModuleProps;
                    }
                    // Use AJAX library to make AJAX request to server side API
                    var l_oAJAXReq = new dsLib.AJAX.Request(l_szURL, this.WebServiceCallBackEventHandler, null, "GET", null, null, false);
                    if (l_oAJAXReq.responseText != null && l_oAJAXReq.responseText != "") {
                        l_oContentPanel.innerHTML = l_oAJAXReq.responseText;
                    }
                }

                if (l_oContentPanel.innerHTML != "") {
                    // Highlight the selected tab and panel
                    for (i = 0; i < this.TabConfigs.Count(); i++) {
                        l_oTab = document.getElementById(this.TabConfigs.Items[i].Value.ContentPanelId);

                        if (l_oTab.id == l_oContentPanel.id) {
                            document.getElementById(this.TabConfigs.Items[i].Value.ContentPanelId).className = "modcontainervisible";
                            document.getElementById(this.TabConfigs.Items[i].Key).className = "moduletabselect";
                            var l_szImgId = "img" + (this.TabConfigs.Items[i].Key);
                            document.getElementById(l_szImgId).src = "/img/arrow/white_down.gif";
                            var l_oImagearrow = "imgarr" + (this.TabConfigs.Items[i].Key);
                            document.getElementById(l_oImagearrow).className = "ModuleTabImageSelect";
                            var l_oSpanImage = "imgspan" + (this.TabConfigs.Items[i].Key);
                            document.getElementById(l_oSpanImage).className = "ModuleTabSpanImage"

                        }
                        else {
                            document.getElementById(this.TabConfigs.Items[i].Value.ContentPanelId).className = "modcontainerhidden";
                            document.getElementById(this.TabConfigs.Items[i].Key).className = "moduletabhide";
                            var l_szImgId = "img" + (this.TabConfigs.Items[i].Key);
                            document.getElementById(l_szImgId).src = "/img/arrow/arrow_right.gif";
                            var l_oImagearrow = "imgarr" + (this.TabConfigs.Items[i].Key);
                            document.getElementById(l_oImagearrow).className = "ModuleTabImageHidden";
                            var l_oSpanImage = "imgspan" + (this.TabConfigs.Items[i].Key);
                            document.getElementById(l_oSpanImage).className = "ModuleTabSpanImage"

                        }
                    }
                    //Update selected module id field
                    if (this.ModuleIdField) {
                        this.ModuleIdField.value = p_oTabConfig.ModuleId;
                    }
                }
            }
        }
    }
    catch (e) { }
}
function TabClientConfig() {
    this.ModuleProps = new KeyValueCollection();
    this.EventHandlers = new KeyValueCollection();
    this.WebServiceURL = "";
    this.WebServiceCallBackEventHandler = null;
    this.CatId = "";
    this.BrandId = "";
    this.ModuleId = "";
    this.ContentPanelId = "";
}
function TabClientConfig(p_szModuleCatId, p_szBrandId, p_szModuleId, p_szContentPanelId, p_szWebserviceUrl, p_oModuleProps) {
    // initialize member variables
    this.ModuleProps = new KeyValueCollection();
    this.EventHandlers = new KeyValueCollection();
    this.WebServiceURL = "";
    this.WebServiceCallBackEventHandler = null;
    this.CatId = "";
    this.BrandId = "";
    this.ModuleId = "";
    this.ContentPanelId = "";

    // assign values to member variables
    if (p_szWebserviceUrl != "") { this.WebServiceURL = p_szWebserviceUrl; }
    if (p_szModuleCatId != "") { this.CatId = p_szModuleCatId; }
    if (p_szBrandId != "") { this.BrandId = p_szBrandId; }
    if (p_szModuleId != "") { this.ModuleId = p_szModuleId; }
    if (p_szContentPanelId != "") { this.ContentPanelId = p_szContentPanelId; }

    if (p_oModuleProps) {
        this.ModuleProps = p_oModuleProps;
    }
}

TabClientConfig.prototype.AddModuleProp = function (p_szPropName, p_szPropValue) {
    this.ModuleProps.Add(p_szPropName, p_szPropValue);
}

TabClientConfig.prototype.AddEventHandler = function (p_szEvtName, p_EvtHandler) {
    this.EventHandlers.Add(p_szEvtName, p_EvtHandler);
}
//================End of TabModule Scripts =============//

/* save to your list - start */
var g_YLAddStatus = new Object();

function addToYL(obj, pId, catId, szList, trx, ylHref, retUrl,siteID) {
    try {
        var ylText = "<span class=\"capitalize\"><b>" + szList + "</b><span>.";
        var errMsg = "We are experiencing issues while adding this item to " + ylText + "&nbsp;Please try again later.";        

        if (g_YLAddStatus[pId] == undefined) {
            var ajaxURL = "/ajax/ajax.asp?type=list&ct=xml&action=add&product=" + pId + "&catid=" + catId + "&trx=" + trx;
            var ajaxReq = new dsLib.AJAX.Request(ajaxURL, null, null, "GET", null, null, false);
            var respText = ajaxReq.responseText;
            if (respText == null)
                respText = "";

            if (respText.toLowerCase() == "not a valid request.") {
                location.href = ylHref;
            }
            else if (ajaxReq.responseXML != null) {
                var respXMLDoc, added, existing, failed;
                added = existing = failed = false;
                respXMLDoc = ajaxReq.responseXML;

                if (respXMLDoc.getElementsByTagName("PassedItems")[0].childNodes[0] != null)
                    added = (respXMLDoc.getElementsByTagName("PassedItems")[0].childNodes[0].nodeValue.split(",").indexOf(pId) >= 0);
                if (respXMLDoc.getElementsByTagName("ExistingItems")[0].childNodes[0] != null)
                    existing = (respXMLDoc.getElementsByTagName("ExistingItems")[0].childNodes[0].nodeValue.split(",").indexOf(pId) >= 0);
                if (respXMLDoc.getElementsByTagName("FailedItems")[0].childNodes[0] != null)
                    failed = (respXMLDoc.getElementsByTagName("FailedItems")[0].childNodes[0].nodeValue.split(",").indexOf(pId) >= 0);
              
                if (added) {
                	g_YLAddStatus[pId] = "added";                	
                	showYLAddConfirmation(obj, "This item has been added to " + ylText, siteID);                	
                }
                else if (existing) {
                    g_YLAddStatus[pId] = "existing";
                    showYLAddConfirmation(obj, "This item is already on " + ylText, siteID);
                }
                else if (failed) {
                	showYLAddConfirmation(obj, "System failure while adding this item to " + ylText, siteID);
                }
            }
            else {
            	showYLAddConfirmation(obj, "System failure while adding this item to " + ylText, siteID);
            }
        }
        else {
        	showYLAddConfirmation(obj, "This item is already on " + ylText, siteID);
        }

    }
    catch (e) {
    }
}

function showYLAddConfirmation(obj, msg, siteID) {    
    var html, url;    
	if (siteID == "") {
	    html = "<div class=\"ylconfirmbody\">" + msg + "</div>";	    
		dsAlert(html, "", "ylconfirm", obj);
	}
    else if (siteID == 1) {
        var ylConfMsgClose = "<a href=\"#\" onclick=\"javascript:showOverlay(this, 'pDetailsyl', false); \" ><img class=\"ylconfirmcloseButton\" src=\"/img/buttons/close-btn.gif\"/></a>";
        html = ylConfMsgClose + "<div class=\"ylconfirmMsg\">" +  msg + "</div>";	    
		inlineOverlay(html, "", "pDetailsyl", null, true, true, 331, true);    
    }
	else {
		//var closeOnBlur = true;
	    html = "<div class=\"ylconfirmbodySC\">" + msg + "</div>";	   
		dsAlert(html, "", "ylconfirmSC", obj, false, false);		
	}
}

function showYLOverlays(id, YListTM) {
    var html, url, msg;
    if (id == 'PrivSettingOverlay') {
        msg = "Your privacy is important to us. By default, sensitive personal items will not appear on " + YListTM + ". You can adjust this setting ON or OFF, according to your preference."
        var PSOverlayClose = "<a href=\"#\" onclick=\"javascript:showOverlay(this, 'PrivSettingOverlay', false); \" ><img src=\"/img/buttons/close-btn.gif\"/></a>";
        html = "<div class=\"PSHeaderDiv\">" + "<div class=\"PSheading\">PRIVACY SETTINGS</div>" + "<div class=\"PSCloseBtn\">" + PSOverlayClose + "</div></div>" + "<div class=\"PSconfirmMsg\">" + msg + "</div>";
        inlineOverlay(html, "", 'PrivSettingOverlay', null, true, true, 331, true);
    }
    else if (id == 'ylsavefilter') {
        msg = "<div id=\"YLSaveinfo\">"
        msg += "You can choose which filter to view using the \"Show\" and \"Category\" dropdown menus, then sort your filtered list using the clickable column heads.";
        msg += "<p id=\"YLCurrentFilter\">You can also save the current filter and sort view as your default, so your view settings will stay the same next time you return to" + YListTM + ".</p></div>";
        msg += "<div class=\"action\">";
        msg += "<span class=\"cancel\"><a href= \"#\" onclick=\"javascript:showOverlay(this, 'ylsavefilter', false);\"><img src=\"/img/buttons/cancel_btn.gif\" border=\"0\" alt=\"cancel\" /></a></span>";
        msg += "<span class=\"save\"><a href=\"#\" onclick=\"javascript:saveYLFilter(this);\"><img src=\"img/sites/1/btn_save_filter.gif\" border=\"0\" alt=\"save\" /></a></span>";
        msg += "</div>";
        var closeOverlay = "<div class=\"closeBtn\"><a href=\"#\" onclick=\"javascript:showOverlay(this, 'ylsavefilter', false);\"><img src=\"/img/buttons/close-btn.gif\" class=\"ylconfirmcloseButton\" /></a></div>";
        html = "<div class=\"hdrCont\"><div class=\"heading\">SAVE FILTER</div>" + closeOverlay + "</div><div class=\"confirmMsg\">" + msg + " </div>";
        inlineOverlay(html, "", id, null, true, true, 400, true);
    }
    else if (id == 'ylsploffer') {
        var closeOverlay = "<div class=\"closeBtn\"><a href=\"#\" onclick=\"javascript:showOverlay(this, 'ylsploffer', false);\"><img src=\"/img/buttons/close-btn.gif\" class=\"ylconfirmcloseButton\" /></a></div>";
        html = "<div class=\"hdrCont\"><div class=\"heading\">Special Offers</div>" + closeOverlay + "</div>" + spOffer;
        inlineOverlay(html, "", id, null, true, true, 331, true);
    }    
}

//@abhishek Display overlay for navigating  to walgreen site.

function showWalgreensOverlay(obj, msg, searchTerm, imgUrl) {
    
    var html, url, buttonURL, backURL;
    //create link of Walgreens search to the button
    buttonURL = "http://www.walgreens.com/search/results.jsp?Ntt=" + searchTerm + "&recType=content";
    
    html = "<div class=\"header2\"><br/>" + msg + "</font></div>";
    backURL = "<br/><a  href=\"#\"onclick =\"javascript:showOverlay(this, 'ylconfirm', false);return false;\"><div class=\"anchorlink\">continue shopping at drugstore.com >></div></br>";
    html = html + backURL;
    url = "<div><a href=\"" + buttonURL + "\"><center><img src=\"" + imgUrl + "\" alt=\"Go to Walgreens.com\" border=\"0\" /><br/></a></div>";
    html = html + url;
    dsAlert(html, "wgoverlay", "ylconfirm", obj, false);

}
/* save to your list - end */

/* remove from your list - start */
function removeFromYL(prodIds, trx) {
    var removedItems = new Array();
    var respXMLDoc, removedCount, failedCount, msg;
    removedCount = failedCount = 0;
    try {
        var productIdList = prodIds.split(",");
        if (productIdList.length < 100) {
            var ajaxURL = "/ajax/ajax.asp?type=list&ct=xml&action=remove&product=" + prodIds + "&trx=" + trx;
            var ajaxReq = new dsLib.AJAX.Request(ajaxURL, null, null, "GET", null, null, false);
            var respText = ajaxReq.responseText;

            if (respText == null)
                respText = "";

            if (respText.toLowerCase() != "not a valid request." && ajaxReq.responseXML != null) {

                respXMLDoc = ajaxReq.responseXML;
                msg = "";

                if (respXMLDoc.getElementsByTagName("PassedItems")[0].childNodes[0] != null) {
                    removedItems = respXMLDoc.getElementsByTagName("PassedItems")[0].childNodes[0].nodeValue.split(",");
                    removedCount = removedItems.length;
                }
                if (respXMLDoc.getElementsByTagName("FailedItems")[0].childNodes[0] != null)
                    failedCount = respXMLDoc.getElementsByTagName("FailedItems")[0].childNodes[0].nodeValue.split(",").length;
            }
            else {
                //add code, if needed.
            }
        } else {
            var seperator = "";
            var productCount = 0;
            var productsToRemove = "";
            for (loopCount = 0; loopCount < productIdList.length; loopCount++) {

                productsToRemove = productsToRemove + seperator + productIdList[loopCount];
                productCount = productCount + 1;
                seperator = ",";
                if (productCount == 100) {
                    var ajaxURL = "/ajax/ajax.asp?type=list&ct=xml&action=remove&product=" + productsToRemove + "&trx=" + trx;
                    var ajaxReq = new dsLib.AJAX.Request(ajaxURL, null, null, "GET", null, null, false);
                    var respText = ajaxReq.responseText;

                    if (respText == null)
                        respText = "";

                    if (respText.toLowerCase() != "not a valid request." && ajaxReq.responseXML != null) {
                       

                        respXMLDoc = ajaxReq.responseXML;
                        msg = "";

                        if (respXMLDoc.getElementsByTagName("PassedItems")[0].childNodes[0] != null) {
                            removedItems = removedItems.concat(respXMLDoc.getElementsByTagName("PassedItems")[0].childNodes[0].nodeValue.split(","));
                            removedCount = removedCount + productCount;
                        }
                        if (respXMLDoc.getElementsByTagName("FailedItems")[0].childNodes[0] != null)
                            failedCount = failedCount + respXMLDoc.getElementsByTagName("FailedItems")[0].childNodes[0].nodeValue.split(",").length;
                    }
                    //after you delete a batch clear the strings and go back to adding them
                    seperator = "";
                    productsToRemove = "";
                    productCount = 0;
                }

            }
            if (productCount != 0) {
                var ajaxURL = "/ajax/ajax.asp?type=list&ct=xml&action=remove&product=" + productsToRemove + "&trx=" + trx;
                var ajaxReq = new dsLib.AJAX.Request(ajaxURL, null, null, "GET", null, null, false);
                var respText = ajaxReq.responseText;

                if (respText == null)
                    respText = "";

                if (respText.toLowerCase() != "not a valid request." && ajaxReq.responseXML != null) {
                  
                    respXMLDoc = ajaxReq.responseXML;
                    msg = "";

                    if (respXMLDoc.getElementsByTagName("PassedItems")[0].childNodes[0] != null) {
                        removedItems = removedItems.concat(respXMLDoc.getElementsByTagName("PassedItems")[0].childNodes[0].nodeValue.split(","));
                        removedCount = removedCount + productCount;
                    }
                    if (respXMLDoc.getElementsByTagName("FailedItems")[0].childNodes[0] != null)
                        failedCount = failedCount + respXMLDoc.getElementsByTagName("FailedItems")[0].childNodes[0].nodeValue.split(",").length;
                }
            }

        }

    }
    catch (e) {
     
    }
    return removedItems;
}

/* remove from your list - end */


/* update druginteraction checker value */

function updateDrugSafetyCheckValue(preferenceCode) {

    try {
        var ajaxURL = "/ajax/ajax.asp?type=user&ct=xml&action=update&preference=" + preferenceCode;
        var ajaxReq = new dsLib.AJAX.Request(ajaxURL, null, null, "GET", null, null, false);
        var respText = ajaxReq.responseText;

        if (respText == null)
            respText = "";
    }
    catch (e) {
    }

}



/* save for later - start */

function format(str) {
    for (i = 1; i < arguments.length; i++) {
        str = str.replace('{' + (i - 1) + '}', arguments[i]);
    }
    return str;
}

var g_YLAddStatus = new Object();

function saveForLater(obj, pId, catId, szList, trx, ylHref, retUrl, lineItemID,siteID,loggedIn) {

	try {
		if (siteID == null) {
			var saveToULText = "You can save this item to ";
			var ylText = "<b>" + szList + "</b>.";
			saveToULText = saveToULText + ylText + "<br/>";
			saveToULText = saveToULText + " and it will be there when " + "<br/>";
			saveToULText = saveToULText + " you're ready to buy.";
			//saveToULText = saveToULText + "<br/>";


			var l_szBuyImgSrc = "/img/buttons/btn_save_to_your_list.gif";
			var l_szPath = format("/cart.asp?delete={0}&catid={1}&saveforlater={2}", (lineItemID), catId, 'true');

			var SaveForLaterButton =
                    format(
                        "<a title=\"save for later {3} \" href=\"{0}\"><img src=\"{1}\" border=\"0\" hspace=\"1\" vspace=\"0\" alt=\"save to your list\" title=\"save to your list&#8482;\"  align=\"absmiddle\"/></a>",
                        l_szPath,
                        l_szBuyImgSrc,
                        ylHref,
                        ylHref);

			var imgCancel = "/img/buttons/btn_cancel.gif";
			var cancelJS = "javascript:showOverlay(this, 'ylconfirm', false);"
			var cancelLink = "<div class=\"cart\" align=left>";
			var cancelLink = cancelLink +
                    format(
                        "<a title=\"cancel\" onclick = \"{0}\" href=\"#\"><img src=\"{1}\" border=\"0\" hspace=\"1\" vspace=\"0\" alt=\"cancel\" title=\"cancel\"  align=\"absmiddle\"/></a>",
                        cancelJS, imgCancel);
			cancelLink = cancelLink + "</div>";


			SaveForLaterButton += "<div class=\"cart\" align=left>";
			SaveForLaterButton = SaveForLaterButton;
			SaveForLaterButton = format("<div style=\"font-weight:bold;\">{0}</div>", SaveForLaterButton);
			SaveForLaterButton = format("<span class=\"buyButton\">{0}</span>", SaveForLaterButton);
			SaveForLaterButton += "</div>";


			//Create Table and put buttons in it.
			var spacer = "<img title=\"\" class=\"spacer1\" src=\"/img/spacer.gif\" alt=\"\"/>";
			var table = "<table border=\"0\">";
			table = table + "<tr>";


			table = table + "<td align=\"left\">";
			table = table + spacer;
			table = table + "</td>";
			table = table + "<td align=\"left\">";
			table = table + spacer;
			table = table + "</td>";

			table = table + "<td align=\"left\">";
			table = table + cancelLink;
			table = table + "</td>";

			table = table + "<td align=\"left\">";
			table = table + spacer;
			table = table + "</td>";

			table = table + "<td align=\"left\">";
			table = table + SaveForLaterButton;
			table = table + "</td>";

			table = table + "</tr>";
			table = table + "</table>";


			var buttonHtml = cancelLink + SaveForLaterButton;
			//saveToULText = saveToULText + cancelLink + SaveForLaterButton;

			var errMsg = "We are experiencing issues while adding this item to " + ylText + "&nbsp;Please try again later.";
			if (g_YLAddStatus[pId] == undefined) {
				showSFLAddConfirmation(obj, saveToULText, table);
			}
		}
		else{
		    var ylText = "<span class=\"capitalize\"><b>" + szList + "</b><span>.";
		    if (g_YLAddStatus[pId] == undefined) {
		            if (loggedIn == 0) {
		                showYLAddConfirmation(obj, "This item has been moved to " + ylText, siteID);
		        }
		        var x = 1; 
                var y = null;
                window.setTimeout(function ()
                { x = x * 3 + 2; y = x / 2; }, 100);                
				var l_szPath = format("/cart.asp?delete={0}&catid={1}&saveforlater={2}", (lineItemID), catId, 'true');
				document.location = l_szPath;							
			}
        }
    }
    catch (e) {
    }
}

function showSFLAddConfirmation(obj, msg, btnHtml) {
    var html, url;
    html = "<div class=\"ylconfirmbody\" text-align:center >" + msg + btnHtml + "</div>";
	var closeOnTimeout = false;
	dsAlert(html, "", "ylconfirm", obj, closeOnTimeout);
}

/* save for later - end */
