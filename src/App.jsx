import { StrictMode, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RoutesModule from './routes/Routes'
import './App.css'


function App() {

  return (
    <div className="app-root container-fluid">
      <div className="container">
        <RoutesModule />
      </div>
    </div>
  )
}

export default App
