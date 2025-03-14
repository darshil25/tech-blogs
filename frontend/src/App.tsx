import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Authentication from './components/Authentication';
import Blog from './components/Blog';

function App() {

  const PrivateRoute = ({ Component }: { Component: React.ComponentType }) => {
    const token = localStorage.getItem('token');
    return token ? <Component /> : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute Component={Home} />} />
        <Route path='/signup' element={<Authentication type='signup'/>} />
        <Route path='/signin' element={<Authentication type='signin'/>} />
        <Route path='/blog/:id' element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
