var CurrentColor = CONST_COLOR_BLACK;
var CurrentTool = CONST_ACTION_TOOL_LINE;
var CurrentStroke = CONST_STROKE_1;
var StartX;
var StartY
var EndX;
var EndY
var SendText;

//Function to set the color of the next design
function setColor(InputColor) {
	
	CurrentColor = InputColor;
	document.getElementById('divSelectedColor').style.backgroundColor = InputColor;
	
} //End of setColor

//Function to set the line width
function setStroke(InputStroke) {

	CurrentStroke = InputStroke;
	/*var jgStroke = new jsGraphics("divSelectedStroke");
	jgStroke.clear();  
	jgStroke.setColor(CurrentColor);
	jgStroke.setStroke(CurrentStroke);
	jgStroke.drawLine(1,10,10,10);
	jgStroke.paint();*/
	
} //End of setStroke

//Function to set the current tool
function setTool(InputTool){
	
	CurrentTool = InputTool;
	
} //End of setTool

//Function to set the starting points for the tool
function setStart(inpX, inpY) {

	StartX = inpX;
	StartY= inpY;
	
} //End of setStart

//Functions to set the end point for the tool
function setEnd(inpX, inpY) {

	EndX = inpX;
	EndY= inpY;

} //End of setEnd

//Addition: 10/10/2009

//Functions to set the end point for the tool
function setSendText(inpText) {

    SendText = inpText;

} //End of setSendText

//Addition: 10/10/2009 - Ends here

//Function to actually draw the tool
function drawPic() {
	
	var jg = new jsGraphics("divCanvas");    
	jg.setColor(CurrentColor);
	jg.setStroke(CurrentStroke);
	
	//Check the input tool and take action accordingly
	switch (CurrentTool) {
		case CONST_ACTION_TOOL_LINE:
			jg.drawLine(StartX, StartY, EndX, EndY);
			break;
			
		case CONST_ACTION_TOOL_RECT:
			jg.drawRect(StartX, StartY, EndX - StartX, EndY - StartY);
			break;
			
		case CONST_ACTION_TOOL_FILLRECT:
			jg.fillRect(StartX, StartY, EndX - StartX, EndY - StartY);
			break;
		
		case CONST_ACTION_TOOL_ELLIPSE:
			jg.drawEllipse(StartX, StartY, EndX - StartX, EndY - StartY);
			break;
			
		case CONST_ACTION_TOOL_FILLELLIPSE:
			jg.fillEllipse(StartX, StartY, EndX - StartX, EndY - StartY);
            break;

        //Addition: 21/09/2009

        case CONST_ACTION_TEXT:

            //Check if this is an update screen call. If not, only then call prompt to get the user input
            if (arguments[0] != 'UPDATECALL') {

                //Get the text to send from the user
                SendText = prompt("Input text...", "Sample Text");
            }
            
            jg.drawString(SendText, StartX, StartY);
            break;

        //Addition: 21/09/2009 - Ends here 
		
	} //End of switch
	
	jg.paint();
	
	//Call the ajax function to load the data on session
	
} //End of drawPic

//Function to clear the canvas
function clearCanvas() {

	document.getElementById('divCanvas').innerHTML = '';

} //End of clearCanvas

//Function to get the server data again
//This will reset the local screen and also the count
function getDataAgain() {
	
	if (confirm(CONST_QUESTION_GET_AGAIN))
	{
		//CLear the canvas
		clearCanvas();
		//set the count value
		setValue('ReadFrom', 0);
		//Get the data from server
		getData();
		
	} //End of checking the confirm return
	
} //End of getDataAgain