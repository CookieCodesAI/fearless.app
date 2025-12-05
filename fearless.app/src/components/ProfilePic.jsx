import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import "./styles/ProfilePic.css"

export default function ProfilePic(){
    const [open, setOpen] = useState(false);
    return(
        <div className = "settings">
            <btn className="profilePic" onClick = {() => {setOpen(!open)}}/>
                {open &&(
                    <div className = "options">
                        <div>Options</div>
                        <div>Activity</div>
                        <div>Account Info</div>
                    </div>
                )}
        </div>
    )
}