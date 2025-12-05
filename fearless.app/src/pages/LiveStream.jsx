import React, {useState, useEffect, useRef} from 'react';
import "../components/styles/LiveStream.css"

export default function LiveStream(){
    const likes = "https://tenor.com/bdILF.gif";
    return (
        <div>
            <div>Write Live Stream Here</div>
            <img src = {likes} alt = "likes" className="likes"></img>
        </div>
    )
}