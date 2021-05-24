import React, {useState } from "react";
import "./Chat.css";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";

function Chat({ messages }) {
const [input,setInput] = useState("");

  const sendMessage  = (e)=>{
    e.preventDefault();


    axios.post("/messages/new", {
      message:input,
      name:"demo",
      timestamp:"far for away",
      received:true,
    });

    setInput("");
  }
  
  

  

  return (
    <div className="Chat">
      <div className="chat__header">
      <Avatar src="https://i.pinimg.com/originals/23/51/17/235117dcce306e66221d50bc8d0ea184.jpg" />
        <div className="chat__headerInfo">
          <h3>afhan</h3>
          <p>Lastseen at......</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__reciever"}`}
          >
            <span className="chat__name">{message.name}</span>
            <br /> {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="send a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
