
//Function to get the value in a control
function getValue(controlId) {

	return document.getElementById(controlId).value;
	
} //End of getValue

//Function to set the value in a control
function setValue(controlId, value) {

	document.getElementById(controlId).value = value;
	
} //End of setValue

//Function to hide or display the loading div
function toggleLoading(isVisible) {
	
	if (isVisible) {
	
		document.getElementById('divLoading').style.visibility = 'visible';
		
	} else {
	
		document.getElementById('divLoading').style.visibility = 'hidden';
		
	} //End of checking the input parameter
	
} //End of toggleLoading

//This is the error handler routine
function errHandler(strData) {

	window.status = strData;

} //End of errHandler