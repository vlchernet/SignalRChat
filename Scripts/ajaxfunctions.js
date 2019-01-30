		
//Variables that are needed for AJAX scripts to work 
var xmlHttp;    //This is the main XML HTTP object
   
//Function to set the drawing data on the server
function setData() {
	
	var requestUrl;

	//Get the url path
	requestUrl = CONST_URL_PATH;
	requestUrl += getToolString();
    
	xmlHttp = GetXmlHttpObject(setDataHandler);

	xmlHttp_Send_Request(CONST_METHOD_POST, xmlHttp, requestUrl);

}//End of setData

//Function to get the drawing data from server
function getData() {
	
	var requestUrl;

	//Get the url path
	requestUrl = CONST_URL_PATH;
	requestUrl += CONST_QUERY_PARAM + CONST_QUERY_PARAM_GETDATA;
	requestUrl += '&' + CONST_QUERY_READ_FROM + getValue('ReadFrom');

	xmlHttp = GetXmlHttpObject(getDataHandler);

	xmlHttp_Send_Request(CONST_METHOD_POST, xmlHttp, requestUrl);

}//End of setData

//function to clear the server data
function clearServerData() {
	
	//Ask a question
	if (confirm(CONST_QUESTION_CLEAR_SERVER)) {
		
		//Clear the local canvas first and then set on server
		clearCanvas();
		
		var requestUrl;

		//Get the url path FOR CLEAR
		requestUrl = CONST_URL_PATH;
		requestUrl += CONST_QUERY_PARAM + CONST_QUERY_PARAM_SETDATA;
		requestUrl += '&' + CONST_QUERY_ACTION + CONST_ACTION_TOOL_CLEAR;

		xmlHttp = GetXmlHttpObject(setDataHandler);

		xmlHttp_Send_Request(CONST_METHOD_POST, xmlHttp, requestUrl);
		
	} //Check if yes is clicked
	
} //End of clearServerData

//Function to handle the callback for the set data ajax function
//THIS HANDLER IS USED FOR TWO AJAX FUNCTIONS
function setDataHandler() {

	//readyState of 4 or 'complete' represents that data has been returned
	//Check the state of the page
	if (xmlHttp.readyState == CONST_INT_READY_STATE || xmlHttp.readyState == CONST_READY_STATE){ 
	
		//Get the response text
		var strText = xmlHttp.responseText;
		
		//Check if error occured
		if (strText.indexOf(CONST_ERROR) >= 0) {
			//Error occured
			errHandler(strText.split(CONST_INTERNAL_SEPERATOR)[1]);
			
		} else {
		
			//Reset the status bar text msg for success
			errHandler(CONST_MSG_DATASET);
			
			//Change the value in the hidden so that next read starts after the current value
			setValue('ReadFrom', parseInt(getValue('ReadFrom')) + 1);
			
		}//End of checking if error occured
		
		//Toggle the waiting div
		toggleLoading(false);

	}  //End of checking if the script is over

} //setDataHandler

//Function to handle the call back of the get data ajax function
function getDataHandler() {
	
	//readyState of 4 or 'complete' represents that data has been returned
	//Check the state of the page
	if (xmlHttp.readyState == CONST_INT_READY_STATE || xmlHttp.readyState == CONST_READY_STATE){ 
	
		//Get the response text
		var strText = xmlHttp.responseText;
		
		//Check if error occured
		if (strText.indexOf(CONST_ERROR) >= 0) {
			//Error occured
			errHandler(strText.split(CONST_INTERNAL_SEPERATOR)[1]);
			
		} else {
		
			//Reset the status bar text msg for success
			errHandler(CONST_MSG_DATAGET);
			
			//Update the screen
			var iNum = updateScreen(strText);
			
			//Change the value in the hidden so that next read starts after the set value
			setValue('ReadFrom', parseInt(getValue('ReadFrom')) + iNum);
			
		}//End of checking if error occured
		
		//Toggle the waiting div
		toggleLoading(false);
		
		//Set a call to the same function again after the specified time interval
		window.setTimeout('getData()', CONST_DATA_TIMEOUT);

	}  //End of chekcing if the script is over
	
} //End of getDataHandler

//function that will handle the data that is received from the getData function
function updateScreen(strText) {
	
	//Split the text into lines
	var strLines = strText.split(CONST_LINE_SEPERATOR);
	var i; 
	
	//Check the length of the lines
	if (strLines.length > 0) {
	
		//Loop on the no of lines
		for (i = 0; i < strLines.length; i++) {
		
			//Get the individual properties by splitting each string
			var strMainText = strLines[i].split(CONST_INTERNAL_SEPERATOR);
			
			//Check if CLEAR IS CALLED
			if (strMainText[0] == CONST_ACTION_TOOL_CLEAR) {
				
				//CLEAR THE CANVAS
				clearCanvas();
				
			} else {
			
				//Set all the variables before calling the draw function
				setTool(strMainText[0]);
				setColor(strMainText[1]);
				setStroke(parseInt(strMainText[2]));
				setStart(parseInt(strMainText[3]), parseInt(strMainText[4]));
				setEnd(parseInt(strMainText[5]), parseInt(strMainText[6]));
				setSendText(strMainText[7]);

				//Now call the draw function
				drawPic('UPDATECALL');
			
			} //End of checking the call for CLEAR
			
		} //End of looping on the no of lines
		
		//Return the count so the next search starts after this number
		return i;
		
	} //End of checking the no of lines
	
	return 0;
} //End of updateScreen

//Function to get the query string for the current tool
function getToolString() {

	var strOut;
	
	strOut = CONST_QUERY_PARAM + CONST_QUERY_PARAM_SETDATA;
	strOut += '&' + CONST_QUERY_ACTION + CurrentTool;
	strOut += '&' + CONST_QUERY_COLOR + CurrentColor;
	strOut += '&' + CONST_QUERY_STROKE + CurrentStroke;
	strOut += '&' + CONST_QUERY_STARTX + StartX;
	strOut += '&' + CONST_QUERY_STARTY + StartY;
	strOut += '&' + CONST_QUERY_EndX + EndX;
	strOut += '&' + CONST_QUERY_EndY + EndY;

	//Addition: 10/10/2009

	strOut += '&' + CONST_QUERY_SEND_TEXT + SendText;
	
	//Addition: 10/10/2009 - Ends here

	return strOut;	

} //End of getToolString