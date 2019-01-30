	//CONSTANTS ARE PLACED IN THE CONSTANTS.JS FILE
    
    //Get the browser type
    var is_ie = (navigator.userAgent.indexOf('MSIE') >= 0) ? 1 : 0; 
    var is_ie5 = (navigator.appVersion.indexOf("MSIE 5.5")!=-1) ? 1 : 0; 
    var is_opera = ((navigator.userAgent.indexOf("Opera6")!=-1)||(navigator.userAgent.indexOf("Opera/6")!=-1)) ? 1 : 0; 
    //netscape, safari, mozilla behave the same??? 
    var is_netscape = (navigator.userAgent.indexOf('Netscape') >= 0) ? 1 : 0; 

/***********************************************************************
	Function to get the XMLHTTP object depending on the browser type 
************************************************************************/

function GetXmlHttpObject(handler) {
	
	var objXmlHttp = null;    //Holds the local xmlHTTP object instance 

        //Depending on the browser, try to create the xmlHttp object 
        if (is_ie){ 
            //The object to create depends on version of IE 
            //If it isn't ie5, then default to the Msxml2.XMLHTTP object 
            var strObjName = (is_ie5) ? 'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP'; 
             
            //Attempt to create the object 
            try{ 
                objXmlHttp = new ActiveXObject(strObjName); 
                objXmlHttp.onreadystatechange = handler; 
            } 
            catch(e){ 
            //Object creation errored 
                alert(BR_IE_SCRIPT); 
                return; 
            } 
        } 
        else if (is_opera){ 
            //Opera has some issues with xmlHttp object functionality 
            alert(BR_OP_SCRIPT); 
            return; 
        } 
        else{ 
            // Mozilla | Netscape | Safari 
            objXmlHttp = new XMLHttpRequest(); 
            objXmlHttp.onload = handler; 
            objXmlHttp.onerror = handler; 
        } 
         
        //Return the instantiated object 
        return objXmlHttp; 
	
} //End of GetXmlHttpObject


/***********************************************************************
	Function to send the request from xmlhttp object
************************************************************************/
//method - This the request type. i.e GET OR POST
//xmlhttp - This is the xmlhhtp object to use for the request
//url - The url to get the form data from
function xmlHttp_Send_Request(method, xmlhttp, url)
{
	xmlhttp.open(method, url, true); 
    xmlhttp.send(null);
    
} // End of xmlHttp_Send_Request

