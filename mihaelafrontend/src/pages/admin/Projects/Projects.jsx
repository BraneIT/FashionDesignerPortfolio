import React,{useState, useEffect} from "react";
import axios from "axios";
import './Projects.css';
import { Pagination } from "../../../components/admin/Pagination/Pagination";
import Button from '../../../components/admin/Buttons/Button'
import { Link } from "react-router-dom";
import Loading, { LoadingSpinner } from "../../../components/admin/Loading/Loading";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    // const [projectsPerPage, setProjectsPerPage] = useState(5);
    const [error, setError] = useState(null);
    let projectsPerPage = 5;

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token');
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/v1/projects`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                      },
                });
                
                setProjects(response.data.data);
                console.log(response.data);
            } catch (err) {
                setError('Failed to fetch projects');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);
    
    // get current posts

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    
   

    if (error) {
        return <div>{error}</div>;
    }
    console.log(projects.length);
    
    return (
        <>
        
        <h1>Projects</h1>
        <div>
            <Button path={`/admin/projects/add`} value="Add project" color="#059212"/>
        </div>
        {/* <Button path={`/admin/projects/`} value='Show project' color='#059212'/> */}
        
        {loading ? (
        <LoadingSpinner />
        ) : (
        <>
        <Pagination projectsPerPage={projectsPerPage} totalProjects={projects.length}  />
        <div className="projects-list">
                {currentProjects.map((project) => (
                  
                    <div key={project.id} className="project-item">
                        <h2>{project.title}</h2>
                        <Button path={`/admin/projects/${project.id}`} value='Show project' color={'#059212'}/>
                        
                    </div>
                
                ))}
        </div> </>)}
        </>
    );
}

export default Projects;