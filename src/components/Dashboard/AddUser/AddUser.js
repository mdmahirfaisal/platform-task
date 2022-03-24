import React from 'react';
import { Button, Paper, TextField } from '@mui/material';
import { useForm } from "react-hook-form";

const AddUser = () => {

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data)
        reset();
    };


    return (
        <div>
            <h1 className='text-3xl lg:text-4xl text-gray-700 my-4 font-semibold'>THIS IS ADD USER</h1>
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

export default AddUser;