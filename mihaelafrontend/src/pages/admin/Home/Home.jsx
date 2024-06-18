import React, { useEffect } from "react";
import './Home.css';
import { useState } from "react";
import axios from "axios";

function Home (){
    const [user, setUser] = useState(null);
    useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        axios.get(`${import.meta.env.VITE_APP_URL}/api/v1/home`,{
            withCredentials:true,
        })
        .then(response =>{
            setUser(response?.data?.data)
            console.log(response?.data?.data);
            
        })
        .catch(error=>{
            console.error('error while fetching data', error)
        })
    },[])
    return(
        <div>
        <h1>Home</h1>
        {user ? (
                <div>
                    <p>Welcome, {user.name}!</p>
                    
                    {/* Add more user details as needed */}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    )
}

export default Home;