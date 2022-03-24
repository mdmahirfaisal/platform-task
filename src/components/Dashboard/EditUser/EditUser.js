import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
import { Button, Paper, TextField } from '@mui/material';

const EditUser = () => {
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const [productImg, setProductImg] = useState(null)
    const [product, setProduct] = useState({})
    const [productImgName, setProductImgName] = useState("Image not selected")
    console.log(product)



    // load single data 
    useEffect(() => {
        fetch(`https://mysterious-waters-68327.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(error => Swal.fire({
                icon: 'error',
                title: `${error}`,
                showConfirmButton: false,
                timer: 3000
            }));
    }, [id]);



    // upload image
    // const handleImgUpload = async e => {
    //     const imageData = new FormData();
    //     setProductImgName(e.target.files[0].name);
    //     imageData.set('key', 'b1329658ac9cd12416e1b24f8e686347');
    //     await imageData.append('image', e.target.files[0])

    //     axios.post('https://api.imgbb.com/1/upload',
    //         imageData)
    //         .then(response => {
    //             console.log(response.data.data.display_url);

    //             setProductImg(response.data.data.display_url);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };
    const onSubmit = productData => {
        console.log(productData);
        let data = {}
        if (productImg) {
            data.img = productImg;
        }
        else {
            data.img = product.img;
        }
        if (productData.name) {
            data.name = productData.name
        }
        else {
            data.name = product.name
        }
        if (productData.price) {
            data.price = productData.price
        }
        else {
            data.price = product.price
        }
        if (productData.description) {
            data.description = productData.description
        }
        else {
            data.description = product.description
        }
        data.id = product?._id

        // axios.put('https://mysterious-waters-68327.herokuapp.com/updateProduct', data)
        //     .then(res => {
        //         console.log(res)
        //         Swal.fire({
        //             position: 'top-center',
        //             icon: 'success',
        //             title: 'This product edit Successfully',
        //             showConfirmButton: false,
        //             timer: 3000
        //         })
        //     })
        //     .catch(error => {
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Oops...',
        //             text: `${error}`,
        //         })
        //     })

    };

    const uploadFile = () => {
        document.getElementById('productImg').click();
    }

    return (
        <div>
            <h1 className='text-3xl lg:text-4xl text-gray-700 my-4 font-semibold'>THIS IS EDIT USER</h1>
            <Paper elevation={3} >

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                    <TextField type="text" {...register("name")} label="Full Name" variant="outlined" required />
                    <TextField type="text" {...register("email")} label="Full Name" variant="outlined" required />
                    <TextField type="text" {...register("password")} label="Full Name" variant="outlined" required />
                    <TextField type="text" {...register("phone")} label="Full Name" variant="outlined" required />
                    <TextField type="text" {...register("address")} label="Full Name" variant="outlined" required />
                    <Button type='submit' variant='contained' color='secondary'>ADD USER</Button>
                </form>

            </Paper>
        </div>
    );
};

export default EditUser;