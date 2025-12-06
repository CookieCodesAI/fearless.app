import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/styles/LiveStream.css"
import WebCam from 'react-webcam'

export default function LiveStream(){
    const navigate = useNavigate();
    return (
        <div className = "stream-container">
            <img src ="/public/live-stream.gif" alt = "likes" className='likes'></img>
            <WebCam className = 'webcam' audio={false} width={500} height={700} videoConstraints={{
                width: 520,
                height: 430,
                facingMode: "user"
            }}/>
            <button className="end-live" onClick={()=>navigate('/')} >End Live Stream</button>
        </div>
    )
}