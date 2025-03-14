import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Authentication from './components/Authentication';
import Blog from './components/Blog';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Authentication type='signup'/>} />
        <Route path='/signin' element={<Authentication type='signin'/>} />
        <Route path='/blog/:id' element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
