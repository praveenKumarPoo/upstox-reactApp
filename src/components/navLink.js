import React from 'react'
import { Link } from "react-router-dom";

const NaveLinks = () => {
    return (
            <ul className="nav-list">
                <li><Link className="link" to="Dashboard">Dashboard</Link></li>
                <li><Link className="link" to="LiveChart">Live stock chart</Link></li>
            </ul>
    )
}

export default NaveLinks