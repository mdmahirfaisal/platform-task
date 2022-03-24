import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import axios from 'axios';

const EditUser = () => {
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const [editUser, setEditUser] = useState({})
    const navigate = useNavigate();

    // load single data 
    useEffect(() => {
        fetch(`https://sheltered-eyrie-88520.herokuapp.com/users/${id}`)
            .then(res => res.json())
            .then(data => setEditUser(data))
            .catch(error => Swal.fire({
                icon: 'error',
                title: `${error}`,
                showConfirmButton: false,
                timer: 3000
            }));
    }, [id]);

    const onSubmit = userData => {
        let data = {}
        if (userData.name) {
            data.name = userData.name
        }
        else {
            data.name = editUser.name
        }
        if (userData.email) {
            data.email = userData.email
        }
        else {
            data.email = editUser.email
        }
        if (userData.password) {
            data.password = userData.password
        }
        else {
            data.password = editUser.password
        }
        if (userData.phone) {
            data.phone = userData.phone
        }
        else {
            data.phone = editUser.phone
        }

        axios.put(`https://sheltered-eyrie-88520.herokuapp.com/users?id=${editUser._id}`, data)
            .then(res => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'This product edit Successfully',
                    showConfirmButton: false,
                    timer: 3000
                })
                if (res.data.modifiedCount > 0) {
                    navigate('/dashboard/manageUsers')
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error}`,
                })
            })
    };

    return (
        <div>
            <h1 className='text-3xl lg:text-4xl text-gray-700 my-4 font-semibold'>THIS IS EDIT USER</h1>
            <Paper elevation={3} >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 p-3'>
                    <p className='text-left text-md ml-2'>Name</p>
                    <input className='border-2 p-3' defaultValue={editUser.name || ""} type="text" {...register("name")} variant="outlined" required />
                    <p className='text-left text-md ml-2'>Email</p>
                    <input className='border-2 p-3' defaultValue={editUser.email || ""} type="email" {...register("email")} variant="outlined" required />
                    <p className='text-left text-md ml-2'>Password</p>
                    <input className='border-2 p-3' defaultValue={editUser.password || ""} type="password" {...register("password")} variant="outlined" required />
                    <p className='text-left text-md ml-2'>Phone</p>
                    <input className='border-2 p-3' defaultValue={editUser.phone || ""} type="number" {...register("phone")} variant="outlined" required />
                    <Button type='submit' variant='contained' color='secondary'>UPDATE USER</Button>
                </form>
            </Paper>
        </div>
    );
};

export default EditUser;