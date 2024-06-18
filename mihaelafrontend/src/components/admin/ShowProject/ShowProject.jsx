import './ShowProject.css';
import axios from 'axios';
import { useEffect, useState} from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/admin/Buttons/Button';
import Loading from '../Loading/Loading';

export const ShowProject = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            
            const token = localStorage.getItem('token');
            try {
                setTimeout
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/v1/projects/${id}`, {
                    timeout:50000000,
                    headers: {
                        'Authorization': `Bearer ${token}`
                      },
                });
                
                console.log(response.data.data);
                setProject(response.data.data);
            } catch (err) {
                console.error('Error:', err);
            } finally{
                setLoading(false);
            }
    }
    fetchProject();
    }, [id]);
    const DeleteProject =  async(projectId) =>{
        const token = localStorage.getItem('token');
        console.log(token);
        try{
            await axios.delete(`${import.meta.env.VITE_APP_URL}/api/v1/projects/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
            })
            navigate('/admin/projects');
        }catch(error){
            return `error: ${error.message}`;
        }
    }

    const DeleteImage =  async(imageId) =>{
        try{
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_APP_URL}/api/v1/image/${imageId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
            })
            console.log(imageId);
            setProject({...project, images: project.images.filter((image) => image.id !== imageId)});
        }catch(error){
            return `error: ${error.message}`;
        }
    }

    return (
        <div>
            <h1>Projects</h1>
            {loading && <Loading />}
            {project && (
                <div>
                    <Button path="/admin/projects" value="Back" color={'#059212'} />
                    <Button path={`/admin/projects/${project.id}/edit`} value="Edit" />

                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <p>{project.year}</p>

                    <h2>Images:</h2>
                    <div className="images-wrapper">
                        {project.images.map((image, index) => (
                            <div key={index}>
                                <img className='project-images' src={`${import.meta.env.VITE_APP_URL}${image.file_path}`} alt={`Image ${index}`} />
                                <button onClick={() => DeleteImage(image.id)}>Delete Image</button>
                            </div>
                        ))}
                    </div>

                    <button className='delete' onClick={() => DeleteProject(project.id)}>Delete Project</button>
                </div>
            )}
        </div>
    );
}