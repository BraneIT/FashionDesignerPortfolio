import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../Buttons/Button";
import { UpdateProjectSchema } from "../../../Validation/UpdateProjectValidation";
import { Spinner } from "../Spinner/Spinner";

export const EditProject = () => {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: '',
    });
    const [loading, setLoading] = useState(false);
    const [execute, setExecute] = useState(false);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
          const token = localStorage.getItem('token');
          setLoading(true);
          try {
            const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/v1/projects/${id}`,{
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });
            const project = response.data.data;
            console.log(response.data);
            setFormData({
              title: project.title || "",
              description: project.description || "",
              year: project.year || "",
            });
            // Handle images if necessary, depending on your API response
          } catch (error) {
            console.error('Failed to fetch project data:', error);
          }finally{
            setLoading(false);
          }
        };
    
        fetchProject();
      }, [id]);
      console.log("form data", formData);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
        console.log('Selected images:', selectedImages);
        
    };
    const constructFormData = (formData, images) => {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('year', formData.year);
        images.forEach((image, index) => {
          formDataToSend.append(`images[${index}]`, image);
        });
        return formDataToSend;
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setExecute(true);
        try {
          await UpdateProjectSchema.validate(formData, { abortEarly: false });
    
          const formDataToSend = constructFormData(formData, images);
        
        for (const entry of formDataToSend.entries()) {
            const [key, value] = entry;
            console.log(`${key}: ${value}`);
          }

          const token = localStorage.getItem('token');
          const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/v1/projects/${id}?_method=PUT`, formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
          });
    
          if (response.status !== 200) {
            throw new Error('Failed to edit project');
          } else {
            console.log('Project edited');
            console.log(response);
            navigate(`/admin/projects/${id}`);
          }
        } catch (validationError) {
          if (validationError.inner) {
            const newErrors = {};
            validationError.inner.forEach((err) => {
              newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
          } else {
            console.error('Failed:', validationError);
          }
        } finally{
          setExecute(false);
        }
      };
    return (
        <div className="edit-project-container">
        <h1>Edit Project</h1>
        <Button path="/admin/projects" value="Cancel" />
        <form className="edit-project-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
            />
            {errors.title && <div>{errors.title}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
            />
            {errors.description && <div>{errors.description}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <select 
              name="year" 
              value={formData.year} 
              onChange={handleChange} 
            >
              <option value="">Select year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
            {errors.year && <div>{errors.year}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="images">Add images</label>
            <input 
              type="file" 
              id="images" 
              name="images" 
              multiple 
              onChange={handleFileChange} 
            />
          </div>
          {execute ? (
            <>
               {/* Show spinner if loading */}
               <button type="submit" className="submit-button" disabled={execute}>Edit Project <Spinner/></button>
            </>
          ) : (
            <button type="submit" className="submit-button" disabled={execute}>Edit Project</button>
          )}
        </form>
      </div>
    )
}