import React from 'react';
import '../css/Navbar.css'

function Navbar() {
    return (
        <div className="Navbar">
            <div className="topBar">
                <h1>GIPHY</h1>
                <div >
                    <h3> user login</h3>
                </div>
            </div>

            <div className="bottomBar">
                <input></input>
                <button>GO</button>
            </div>
        </div>
    );
}

export default Navbar;