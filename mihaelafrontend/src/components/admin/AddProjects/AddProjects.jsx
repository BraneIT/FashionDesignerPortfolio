import './AddProjects.css';
import Button from '../../../components/admin/Buttons/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoreProjectSchema } from '../../../Validation/StoreProjectValidation';
import ImageUpload from '../../../components/admin/ImageUpload/ImageUpload';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';

function AddProjects() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorImage, setErrorImage]= useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('Use effect images',images);
  },[images]);

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
    console.log('Selected images:', selectedImages[0]);
    console.log('Images:', images);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await StoreProjectSchema.validate(formData, { abortEarly: false });

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('year', formData.year);
      images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
      });
      
      const token = localStorage.getItem('token');
      setLoading(true);
      
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/v1/projects`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log(images);

      for (const entry of formDataToSend.entries()) {
        const [key, value] = entry;
        console.log(`${key}: ${value}`);
      }
      if (response.status !== 200) {
        console.log('Failed to add project', response.status);
      } else {
        console.log('Project added');
        console.log(response);
        navigate('/admin/projects');
      }
    } catch (validationError) {
      if (validationError.inner) {
        const newErrors = {};
        validationError.inner.forEach((err) => {
          newErrors[err.path] = err.message;
          newErrors.images = err.message;
        });
        if(images.length === 0){
          setErrorImage(true);
        }
        else{
          setErrorImage(false);
        }
        setErrors(newErrors);
      } else {
        console.error('Failed:', validationError);
      }
    } finally{
      setLoading(false);
    }
  };

  // const triggerFileInput = () => {
  //   document.getElementById('images').click();
  // };

  return (
    <div className="add-project-container">
      <h1>Add Project</h1>
      <Button path="/admin/projects" value="Cancel" />
      <form className="add-project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
          />
          {errors.title && <div className='errors'>{errors.title}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
          />
          {errors.description && <div className='errors'>{errors.description}</div>}
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
          {errors.year && <div className='errors'>{errors.year}</div>}
        </div>
        <div className="form-group">
        <label htmlFor="images">Add images</label>
          <input 
            type="file" 
            id="images" 
            // className='hidden'
            name="images" 
            multiple 
            onChange={handleFileChange} 
            
          />
          {errorImage&& <div className='errors'>No images selected</div>}
          {/* {errors.images && <div className='errors'>{errors.images}</div>} */}
           {/* <button type="button" onClick={triggerFileInput} className="trigger-button">Upload Images</button> */}
        </div>
        
        {loading ? (
            <>
               {/* Show spinner if loading */}
               <button type="submit" className="submit-button" disabled={loading}>Add Project <Spinner/></button>
            </>
          ) : (
            <button type="submit" className="submit-button" disabled={loading}>Add Project</button>
          )}
      </form>
    </div>
    
  );
}

export default AddProjects;