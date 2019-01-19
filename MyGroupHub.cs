using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Threading.Tasks;

namespace SignalRChat
{
    [HubName("GroupChatHub")]
    public class MyGroupHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        public void BroadCastMessage(String msgFrom, String msg, String GroupName)
        {
            var id = Context.ConnectionId;
            string[] Exceptional = new string[0];
            Clients.Group(GroupName, Exceptional).receiveMessage(msgFrom, msg, "");
            //Clients.All.receiveMessage(msgFrom, msg, "");
            /*string[] Exceptional = new string[1];
            Exceptional[0] = id;       
            Clients.AllExcept(Exceptional).receiveMessage(msgFrom, msg);*/
        }

        [HubMethodName("groupconnect")]
        public void Get_Connect(String username, String userid, String connectionid, String GroupName)
        {
            string count = "NA";
            string msg = "Welcome to group " + GroupName;
            string list = "";

            var id = Context.ConnectionId;
            Groups.Add(id, GroupName);

            string[] Exceptional = new string[1];
            Exceptional[0] = id;

            Clients.Caller.receiveMessage("Group Chat Hub", msg, list);
            Clients.OthersInGroup(GroupName).receiveMessage("NewConnection", GroupName + " " + username + " " + id, count);
            //Clients.AllExcept(Exceptional).receiveMessage("NewConnection", username + " " + id, count);
        }

        public override Task OnConnected()
        {
            //string username = Context.QueryString["username"].ToString();
            string clientId = Context.ConnectionId;
            string data = clientId;
            string count = "NA";
            Clients.Caller.receiveMessage("ChatHub", data, count);
            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            string count = "NA";

            string clientId = Context.ConnectionId;
            string[] Exceptional = new string[1];
            Exceptional[0] = clientId;
            Clients.AllExcept(Exceptional).receiveMessage("NewConnection", clientId + " leave", count);

            return base.OnDisconnected(stopCalled);
        }

        //public Task Draw(int prevX, int prevY, int currentX, int currentY, string color)
        //{
        //    return Clients.Others.SendAsync("draw", prevX, prevY, currentX, currentY, color);
        //}
    }
}