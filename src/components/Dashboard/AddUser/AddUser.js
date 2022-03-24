import React from 'react';
import { Button, Paper, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import axios from 'axios';

const AddUser = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        axios.post('https://sheltered-eyrie-88520.herokuapp.com/users', data)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'New User Added Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User add Canceled!',
                    })
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
            <h1 className='text-3xl lg:text-4xl text-gray-700 my-4 font-semibold'>THIS IS ADD USER</h1>
            <Paper elevation={3} >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 p-3'>
                    <TextField type="text" {...register("name")} label="Full Name" variant="standard" required />
                    <TextField type="email" {...register("email")} label="Email" variant="standard" required />
                    <TextField type="password" {...register("password")} label="Password" variant="standard" required />
                    <TextField type="number" {...register("phone")} label="Phone" variant="standard" required />
                    <Button type='submit' variant='contained' color='secondary'>ADD USER</Button>
                </form>
            </Paper>
        </div>
    );
};

export default AddUser;