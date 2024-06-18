import * as yup from 'yup';

export const StoreProjectSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    year: yup.string().required('Year is required'),
    // images: yup.array()
    //     .min(1, 'At least one image is required')
    //     .test('at-least-one-image', 'At least one image is required', (value) => {
    //         console.log("yup valiue",value);
    //         if (!value) return false;
    //         // return value && value.length > 0;
    //     })
    //     .of(
    //         yup.mixed().test(
    //             'fileSize',
    //             'File size is too large',
    //             (value) => {
    //                 if (!value) return true;
    //                 return value && value.size <= 2 * 1024 * 1024; // 2MB
    //             }
    //         )
    //     )
})