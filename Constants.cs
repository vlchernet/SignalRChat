using System;

namespace SignalRChat
{
	/// <summary>
	/// Summary description for Constants.
	/// </summary>
	public class Constants
	{
		public Constants()
		{
			
		}

		//Variables in the application object
		public const string CONST_APP_DATA_ARRAY_NAME = "ArrayData";

		//THE UNIVERSAL IN BETWEEN LINES SEPERATOR
		public const string CONST_INTERNAL_SEPERATOR = "$";

		//THE UNIVERSAL LINE SEPERATOR
		public const string CONST_LINE_SEPERATOR = "#";

		//THE UNIVERSAL CONSTANT TO IDENTIFY ERROR
		public const string CONST_ERROR = "ERROR";

		//COLOR CONSTANTS
		public const string CONST_COLOR_RED = "red";

		public const string CONST_COLOR_BLUE = "blue";

		public const string CONST_COLOR_BLACK = "black";

		public const string CONST_COLOR_GREEN = "green";

		public const string CONST_COLOR_BROWN = "brown";

		//TOOL CONSTANTS
		public const string CONST_ACTION_TOOL_LINE = "LINE";

		public const string CONST_ACTION_TOOL_RECT = "RECT";

		public const string CONST_ACTION_TOOL_ELLIPSE = "ELLIPSE";
		
		public const string CONST_ACTION_COLOR = "COLOR";

		public const string CONST_ACTION_STROKE = "STROKE";

        //Addition: 21/09/2009

        public const string  CONST_ACTION_TEXT = "TEXT";

        //Addition: 21/09/2009 - Ends here

		public const string CONST_ACTION_TOOL_CLEAR = "CLEAR";

		//Query String constants

		public const string CONST_QUERY_VALUE = "Value";

		public const string CONST_QUERY_PARAM = "Param";

		public const string CONST_QUERY_ACTION = "Action";

		public const string CONST_QUERY_READ_FROM = "ReadFrom";

		public const string CONST_QUERY_COLOR = "Color";

		public const string CONST_QUERY_STROKE = "Stroke";

		public const string CONST_QUERY_STARTX = "StartX";

		public const string CONST_QUERY_STARTY = "StartY";

		public const string CONST_QUERY_ENDX = "EndX";

		public const string CONST_QUERY_ENDY = "EndY";

        //Addition: 10/10/2009
        public const string CONST_QUERY_SEND_TEXT = "SendText";

        //Addition: 10/10/2009 - Ends here

		//Identifies that the call is to send the data to the server
		public const string CONST_QUERY_PARAM_SETDATA = "SetData";

		//Identifies that the call is to get the data from server
		public const string CONST_QUERY_PARAM_GETDATA = "GetData";

		//ERROR MESSAGES
		public const string CONST_ERROR_SETDATA = "Error setting data !";

		public const string CONST_ERROR_PARAM = "Incorrect parameters !";

		public const string CONST_ERROR_UNKNOWN = "UNKNOWN ERROR !";

		public const string CONST_ERROR_ALREADY_UPDATED = "Your Screen is already updated !";

	} //End of class

} //End of Namespace
