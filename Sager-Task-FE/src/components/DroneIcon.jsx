import React from 'react'
import { isAllowed } from '../utils/formatters'
import droneImg from '../assets/drone.svg';


export default function DroneIcon({ yaw=0, registration='' }) {
const color = isAllowed(registration) ? 'var(--success)' : 'var(--danger)'
return (
    //we rotate the drone icon based on its yaw value randomly for demo purposes
    //drone icon inside a circle with arrow indicating the front direction
<div className="drone-wrapper" style={{ transform: `translate(50%, 50%) rotate(${yaw}deg)` }}>
<div className="drone-arrow" />
<div className='drone-body' style={{backgroundColor: color}}><img src={droneImg} alt="Drone" className="drone-icon" /></div>
</div>

)
}