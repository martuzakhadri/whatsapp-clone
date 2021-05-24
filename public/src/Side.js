import React from "react";
import "./Side.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from"./SidebarChat";

function Side() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
         <Avatar src="https://i.pinimg.com/originals/23/51/17/235117dcce306e66221d50bc8d0ea184.jpg" />
         <div className="sidebar__headerRight">
            <IconButton>
               <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
         </div>
      </div>

      <div className="sidebar__search">
          <div className="sidebar__searchContainer">
              <SearchOutlined />
              <input placeholder="Search or start new chat" type="text" />
          </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Side;
