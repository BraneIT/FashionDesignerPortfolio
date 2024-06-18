import React from "react";
import Logout from "../../authentication/Logout/Logout";
import AdminMenu from "../../../components/admin/AdminMenu/AdminMenu";
import { Routes, Route, Outlet } from 'react-router-dom';
import './Dashboard.css';


const Dashboard = ({})=>{
 return(
    <div className="admin-pages-wrapper">
        <AdminMenu />
        <main>
            <div className="wrapper"> 
                <div className="logout">
                    <Logout className="logout"/>
                </div>
                <Outlet />
            </div>
        </main>
        
    </div>
 )   
}

export default Dashboard;