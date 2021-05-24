import React from 'react'
import "./SidebarChat.css"
import {Avatar} from '@material-ui/core'

function SidebarChat() {
    return (
        <div className="sidebarChat">
           <Avatar src="https://i.pinimg.com/originals/23/51/17/235117dcce306e66221d50bc8d0ea184.jpg" />
            <div className="SidebarChat__info">
                <h2>madani</h2>
                <p>this is lat massege</p>

            </div>
            
        </div>
    )
}

export default SidebarChat
