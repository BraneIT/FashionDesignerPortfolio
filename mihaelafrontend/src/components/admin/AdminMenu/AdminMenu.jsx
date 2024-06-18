import React from "react";
import { Link } from 'react-router-dom';
import './AdminMenu.css'
import AdminMenuButtons from "../AdminMenuButton/AdminMenuButton";

function AdminMenu(){
 return(
    <div className="admin-menu">
        
            <div className="admin-menu-container">
                <div className="logo-container">
                    <h3>Admin Panel</h3>
                </div>
                <div className="menu-items">
                <AdminMenuButtons path="/admin/home" value="Home" /> 
                <AdminMenuButtons path="/admin/projects" value="Projects" /> 
                <AdminMenuButtons path="/admin/certificates" value="Certificates" /> 
                <AdminMenuButtons path="/admin/reviews" value="Reviews" /> 
                
                </div>
            </div>
        
    </div>
 )   
}

export default AdminMenu;