import React from 'react'
import { Stories } from './components/Stories'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <img 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram"
          className="logo"
        />
      </header>
      <Stories />
    </div>
  )
}

export default App 