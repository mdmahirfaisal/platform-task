import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Swal from 'sweetalert2'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const tableStyle = {
    borderRight: '1px solid gray'
}

const ManageUsers = () => {
    const [usersData, setUsersData] = React.useState([]);

    React.useEffect(() => {
        fetch('https://sheltered-eyrie-88520.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setUsersData(data))
            .catch(error => Swal.fire({
                icon: 'error',
                title: `Set to ${error}`,
                showConfirmButton: false,
                timer: 3000
            }));
    }, []);

    // handle delete 
    const handleDeleteUser = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'bg-green-500 px-5 py-2 rounded-lg ml-2',
                cancelButton: 'bg-red-500 px-5 py-2 rounded-lg'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this item!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://sheltered-eyrie-88520.herokuapp.com/users/${id}`;
                fetch(url, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const available = usersData.filter(user => user._id !== id);
                            setUsersData(available);

                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'This Product has been deleted.',
                                'success'
                            )
                        }
                    })

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'this file is safe :)',
                    'error'
                )
            }
        })
    };

    let navigate = useNavigate();

    // update product
    const handleUpdateProduct = (id) => {
        const url = `/dashboard/editUser/${id}`
        navigate(url);
    }

    return (
        <div>
            <h1 className='text-3xl lg:text-4xl text-gray-700 my-4 font-semibold'>THIS IS MANAGE USERS</h1>
            <div className="container">
                <Paper elevation={5} sx={{ width: '100%', borderRadius: '8px' }}>
                    <TableContainer sx={{ borderRadius: '7px' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableStyle} align="center">Full Name</TableCell>
                                    <TableCell style={tableStyle} align="center">Email</TableCell>
                                    <TableCell style={tableStyle} align="center">Password</TableCell>
                                    <TableCell style={tableStyle} align="center">Phone</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersData?.map((user) => (
                                    <TableRow
                                        key={user._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                        <TableCell style={tableStyle} align="center">{user?.name}</TableCell>
                                        <TableCell style={tableStyle} align="center">{user?.email}</TableCell>
                                        <TableCell style={tableStyle} align="center">{user?.password}</TableCell>
                                        <TableCell style={tableStyle} align="center">{user?.phone}</TableCell>
                                        <TableCell align="center" sx={{ width: '120px' }}>
                                            <div className="flex items-center justify-evenly flex-wrap">
                                                <h5 onClick={() => handleUpdateProduct(user?._id)} className='xs:mb-2 cursor-pointer font-bold px-2' > <EditIcon sx={{ color: 'green' }} /></h5>

                                                <h5 onClick={() => handleDeleteUser(user?._id)} className=' cursor-pointer font-bold px-2' ><DeleteForeverIcon sx={{ color: 'red' }} /></h5>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
};

export default ManageUsers;