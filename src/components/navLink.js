import React from 'react'
import { Link } from "react-router-dom";

const NaveLinks = () => {
    return (
            <ul className="nav-list">
                <li><Link data-testid="dashboard" className="link" to="Dashboard">Dashboard</Link></li>
                <li><Link data-testid="LiveChart"  className="link" to="LiveChart">Live stock chart</Link></li>
            </ul>
    )
}

export default NaveLinks