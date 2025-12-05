import React from 'react';
import "./styles/ButtonPanel.css"
import { useNavigate } from 'react-router-dom';

export default function ButtonPanel(){
    const nameOne = "Friends";
    const nameTwo = "Krish";

    const numOne = "+1 (571)-990-1320";
    const numTwo = "+1 (789)-542-1029";

    const appNameOne = "Calls";
    const appNameTwo = "iMessages";

    const coordinates = "38.9764°N, 77.5534°W";
    const handle = "@vaanibatra";

    const navigate = useNavigate();
    return(
    <div>
        <div onClick = {()=>navigate("/call")} className="big-call">
                <div className = "small-text">{appNameOne}</div>
                <div className = "big-text">{nameOne}</div>
                <div className = "bottom-small-text">{numOne}</div>
        </div>
        <div className="container-panel">
            <div onClick = {()=>navigate("/call")}  className="small-call">
                <div className = "small-text">{appNameOne}</div>
                <div className = "medium-text">{nameTwo}</div>
                <div className = "bottom-small-text">{numTwo}</div>
            </div>
            <div onClick = {()=>navigate("/text")} className="text">
                <div className = "small-text">{appNameTwo}</div>
                <div className = "medium-text">{nameTwo}</div>
                <div className = "bottom-small-text">{numTwo}</div>
            </div>
            <div onClick = {()=>navigate("/location")}  className="location">
                <div className = "regular-text">{coordinates}</div>
                <div className = "bottom-small-text">Live Location</div>
            </div>
            <div onClick = {()=>navigate("/livestream")}  className="live-stream">
                <div className = "medium-text">Live Stream</div>
                <div className = "bottom-small-text">{handle}</div>
            </div>
        </div>
     </div>
        
    )
}