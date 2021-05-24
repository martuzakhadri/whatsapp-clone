import React, { useEffect,useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Side from "./Side";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages,setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync')
    .then(response =>{
      setMessages(response.data)

    })
  },[])
  console.log(messages)


  useEffect(() => {
    const  pusher = new Pusher('82c078e32421d2c86044', {
      cluster: 'ap2'
  });
  const channel = pusher.subscribe("messages");
    channel.bind('inserted', function(newMessage) {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });
    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);
  console.log(messages);



 

  return (
    <div className="app">
      <div className="app__body">
        <Side />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
