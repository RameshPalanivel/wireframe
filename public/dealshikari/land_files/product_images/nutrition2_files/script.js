// timestamp : 1346935753557, //

var STTAF = {
userid : "200901036370",
version : "20090420",
widgetUrl : "http://taf.socialtwist.com:80/taf",
widgetHostUrl : "http://taf.socialtwist.com:80",
cdnUrl : "s3.amazonaws.com/cdn.socialtwist.com",
contentUrl : "http://content.socialtwist.com/",
imagesUrl : "images.socialtwist.com",
isButtonExpandable : false,
isOverlaySelected : false,
isPopupMode : false,
isHideFlashSelected : false,
frameHeight : "510",
frameBorderColor : "gray",
frameWidth : "482",
cssTheme : "quicksilver",
loadJS : "getScriptJS.js",
widgetFile : "widget",
serviceOrder : {"tabs":["email","social","im"],"email":["email"],"im":["gtalk","msnim","yim"],"social":["facebook","twitter"],"blog":[],"cms":[],"bookmark":[]},
    enableHoverBranding : true,    

    //emod//
    ie : document.all && !window.opera,    
    addJavascript: function(jsname) {
        var heads = document.getElementsByTagName('head');
        var th = null;

        if (heads && heads.length && heads.length > 0) {
            for (var i = 0; i < heads.length; i++) {
                if (heads[i] && heads[i].lastChild && heads[i].lastChild.src == jsname) {
                    return false;
                }
            }
            th = document.getElementsByTagName('head')[0];
        } else {
            th = document.getElementById("st" + STTAF.userid);
        }

        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', jsname);
        th.appendChild(s);
    }
};



STTAF.addJavascript("http://" + STTAF.cdnUrl + "/" + STTAF.loadJS + "");
