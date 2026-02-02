
// from the main.txsx file  following the root element in index.html


import { useState } from 'react'
import Login from './Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  return (
    // Use the custom class for the main container
    <div className="main-container">
      {showLogin && (
        <Login 
          onLogin={() => {
            setIsLoggedIn(true)
            setShowLogin(false)
          }} 
          onClose={() => setShowLogin(false)} 
        />
      )}
      {/* Navigation Bar */}
      <nav className="nav-bar">
        {/* Logo Section */}
        <div className="nav-logo">CSA Kirinyaga</div>
        
        {/* Navigation Links */}
        <ul className="nav-list">
          <li>
            <a href="#" className="nav-tab">
              {/* Home Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-tab">
              {/* About Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-tab">
              {/* Community Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <span>Community</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-tab">
              {/* Support Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              <span>Support</span>
            </a>
          </li>
        </ul>
        
        {/* Login Button */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-gray-600">Welcome, Admin</span>
            <button className="btn-primary" onClick={() => setIsLoggedIn(false)}>
              Log Out
            </button>
          </div>
        ) : (
          <button className="btn-primary" onClick={() => setShowLogin(true)}>
            Log In
          </button>
        )}
      </nav>
      
      {/* Main Content Area */}
      <div className="content-container">
        <h1 className="heading-primary">{isLoggedIn ? 'Welcome Back!' : 'Hello World'}</h1>
      </div>
    </div>
  )
}

export default App