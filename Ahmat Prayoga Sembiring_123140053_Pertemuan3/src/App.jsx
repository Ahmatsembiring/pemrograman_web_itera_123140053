import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BookProvider } from './context/BookContext'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import Stats from './pages/Stats/Stats'
import './App.css'

export default function App() {
  return (
    <BookProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="main-layout">
            <Sidebar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Stats />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </BookProvider>
  )
}
