import React from 'react'
import MapView from './components/MapView'
import DroneList from './components/DroneList'
import Counter from './components/Counter'

export default function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <DroneList />

      {/* Map + Counter */}
      <div style={{ position: 'relative' }}>
        <MapView />
        <Counter />
      </div>
    </div>
  )
}
