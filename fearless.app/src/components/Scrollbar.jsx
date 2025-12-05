import React from 'react';
import "./styles/Scrollbar.css"

export default function Scrollbar(){
    return (
        <div>
            <div className="shortcuts">Shortcuts</div>
            <div className = "scrollbar-container">
                <div className = "scrollbar">
                    <div className ="components">All</div>
                    <div className ="components">Map</div>
                    <div className ="components">Live Stream</div>
                    <div className ="components">Text</div>
                    <div className ="components">Calls</div>
                    <div className ="components">Notes</div>
                </div>
            </div>
        </div>

    )
}