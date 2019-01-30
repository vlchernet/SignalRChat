using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Text;

namespace SignalRChat
{
	/// <summary>
	/// Summary description for HandleData.
	/// </summary>
	public partial class HandleData : System.Web.UI.Page
	{
		
		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: This call is required by the ASP.NET Web Form Designer.
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{    
		}
		#endregion
        		
		#region Page and control events

		protected void Page_Load(object sender, System.EventArgs e)
		{

			//To identify the reason of the call
			string strParam = Request.QueryString.Get(Constants.CONST_QUERY_PARAM);

			//Check the param
			if (strParam != null && strParam.Length > 0)
			{
				try
				{

					//Check why the page was called
					if (strParam.Equals(Constants.CONST_QUERY_PARAM_SETDATA)) 
					{
						setData();
					} 
					else 
					{
						getData();

					} //End of checking the param string
				} 
				catch 
				{
					//Write the error with the first word set to identify as error
					Response.Write(Constants.CONST_ERROR + Constants.CONST_INTERNAL_SEPERATOR + 
						Constants.CONST_ERROR_UNKNOWN);
				}
			} 
			else 
			{				
				//Write the error with the first word set to identify as error
				Response.Write(Constants.CONST_ERROR + Constants.CONST_INTERNAL_SEPERATOR + 
								Constants.CONST_ERROR_PARAM);

			}//End of checking if the param exists

		} //End of pageload

		#endregion

		#region Private Functions

		//Functino to get the data and set it to the page
		private void getData() 
		{

			string strReadFrom = Request.QueryString.Get(Constants.CONST_QUERY_READ_FROM);
			
			//Check the read value
			if (strReadFrom != null && strReadFrom.Length > 0) 
			{
				StringBuilder strText = new StringBuilder("");
				int iFrom = Int32.Parse(strReadFrom);
				//Get the array list from the application object
				ArrayList arrData = (ArrayList)Application[Constants.CONST_APP_DATA_ARRAY_NAME];

				//Check if ifrom is equal to the length of the arraylist
				//Means no new data to read
				if (iFrom >= arrData.Count) 
				{
					//Screen is already updated
					//Write the error with the first word set to identify as error
					Response.Write(Constants.CONST_ERROR + Constants.CONST_INTERNAL_SEPERATOR + 
						Constants.CONST_ERROR_ALREADY_UPDATED);
					
					return;

				} //End of checking the length

				//Add the first element
				strText.Append(arrData[iFrom]);

				//Do the process to create a response string 
				for (int i = iFrom + 1; i < arrData.Count; i++) 
				{
					strText.Append(Constants.CONST_LINE_SEPERATOR + arrData[i]);
				
				} //End of appending the data to the string builder
				
				//Write the string builder to the page
				Response.Write(strText.ToString());
			} 
			else 
			{
				//Write the error with the first word set to identify as error
				Response.Write(Constants.CONST_ERROR + Constants.CONST_INTERNAL_SEPERATOR + 
					Constants.CONST_ERROR_PARAM);

			}//End of checking the read value

		} //End of getData

		//Function to set the data on the server
		private void setData() 
		{
			//Get the array list from the application object
			ArrayList arrData = (ArrayList)Application[Constants.CONST_APP_DATA_ARRAY_NAME];

			//Get all the drawing values from the request querstring			
			string strAction = Request.QueryString.Get(Constants.CONST_QUERY_ACTION);
			string strColor = Request.QueryString.Get(Constants.CONST_QUERY_COLOR);
			string strStroke = Request.QueryString.Get(Constants.CONST_QUERY_STROKE);
			string strStartX = Request.QueryString.Get(Constants.CONST_QUERY_STARTX);
			string strStartY = Request.QueryString.Get(Constants.CONST_QUERY_STARTY);
			string strEndX = Request.QueryString.Get(Constants.CONST_QUERY_ENDX);
			string strEndY = Request.QueryString.Get(Constants.CONST_QUERY_ENDY);
            string strSendText = Request.QueryString.Get(Constants.CONST_QUERY_SEND_TEXT);

			if (strAction != null && strAction.Length > 0)
			{ 
				if (strAction.Equals(Constants.CONST_ACTION_TOOL_CLEAR)) 
				{
					arrData.Add(strAction + Constants.CONST_INTERNAL_SEPERATOR);
				} 
				else 
				{
					//Check if all are present
					if (strColor != null && strStroke != null && 
						strStartX != null && strStartY != null && strEndX != null && strEndY != null &&
						strColor.Length > 0 && strStroke.Length > 0 &&
						strStartX.Length > 0 && strStartY.Length > 0 && strEndX.Length > 0 && strEndY.Length > 0) 
					{

						//Set the data in the application array
						arrData.Add(strAction + Constants.CONST_INTERNAL_SEPERATOR + 
							strColor + Constants.CONST_INTERNAL_SEPERATOR + 
							strStroke + Constants.CONST_INTERNAL_SEPERATOR + 
							strStartX + Constants.CONST_INTERNAL_SEPERATOR +
							strStartY + Constants.CONST_INTERNAL_SEPERATOR + 
							strEndX + Constants.CONST_INTERNAL_SEPERATOR +
                            strEndY + Constants.CONST_INTERNAL_SEPERATOR +
                            strSendText);

						//Write a blank string as an identification that no error occured
						Response.Write("");

					} 
					else 
					{
						//Write the error with the first word set to identify as error
						Response.Write(Constants.CONST_ERROR + Constants.CONST_INTERNAL_SEPERATOR + 
							Constants.CONST_ERROR_PARAM);

					}//End of Checking if all querystrings are valid
				}

			} 
			else 
			{
				//Write the error with the first word set to identify as error
				Response.Write(Constants.CONST_ERROR + Constants.CONST_INTERNAL_SEPERATOR + 
					Constants.CONST_ERROR_PARAM);

			}//Check if the action is not null

		} //End of setData

		#endregion
		
	} //End of class

} //End of Namespace