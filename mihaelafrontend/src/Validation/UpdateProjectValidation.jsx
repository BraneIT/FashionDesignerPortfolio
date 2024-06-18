import * as yup from 'yup';

export const UpdateProjectSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    year: yup.string().required('Year is required'),
})