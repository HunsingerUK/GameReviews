import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// pages & layout
import HomePage from './pages/Homepage'
import ReviewDetails from './pages/ReviewDetails'
import Category from './pages/Category'
import SiteHeader from './components/SiteHeader'


function App() {
  return (
    <Router>    
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/details/:id" element={<ReviewDetails/>} />
          <Route path="/category/:id" element={<Category/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
