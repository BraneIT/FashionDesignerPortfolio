import React from "react";
import { Link } from 'react-router-dom';
import './AdminMenuButton.css'


function AdminMenuButtons({path, value}){
    return(
        <Link to={path} className="admin-menu-buttons">{value}</Link>
    )
}

export default AdminMenuButtons