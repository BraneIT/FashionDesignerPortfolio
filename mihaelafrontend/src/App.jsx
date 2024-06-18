import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/frontend/Home';
import About from './pages/frontend/About';
import Contact from './pages/frontend/Contact';
import AdminHome from './pages/admin/Home/Home'
import Menu from './components/frontend/Menu';
import Login from './pages/authentication/Login/Login';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import ProtectedRoutes from './pages/authentication/ProtectedRoutes';
import Projects from './pages/admin/Projects/Projects';
import Certificates from './pages/admin/Certificates/Certificates';
import Reviews from './pages/admin/Reviews/Reviews';
import AddProjects from './components/admin/AddProjects/AddProjects';
import { ShowProject } from './components/admin/ShowProject/ShowProject';
import { EditProject } from './components/admin/EditProject/EditProject';

function App() {

  
  return (
    <Router>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/*Auth route */}
        <Route path='/login' element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoutes/>}>
          <Route
            path="admin"
            element={
              <Dashboard />
            }
          > 
          <Route path="home" element={<AdminHome />} />

          {/* Projects routes*/}
          <Route path="projects" element={<Projects />} />
          <Route path='projects/add' element={<AddProjects/>} />
          <Route path='projects/:id' element={<ShowProject />} />
          <Route path='projects/:id/edit' element={<EditProject />} />

          {/* Certificate routes*/}
          <Route path="certificates" element={<Certificates />} />

          {/* Reviews routes*/}
          <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
          {/* Redirect to Login if route not found */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
 
  )
}

export default App
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // // Your login and logout logic functions
  // const handleLogin = () => {
  //   // Implement your login logic here
  //   setIsAuthenticated(true);
  // };

  // const handleLogout = () => {
  //   // Implement your logout logic here
  //   setIsAuthenticated(false);
  // };

   {/* <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}