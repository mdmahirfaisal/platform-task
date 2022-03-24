import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, Outlet } from 'react-router-dom';
import { Button, Container, ListItem, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoginIcon from '@mui/icons-material/Login';
import useAuth from '../../../hooks/useAuth';


const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const { logOut } = useAuth();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' }}>
                <div className='flex items-center justify-between'>
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }), color: 'black'
                            }}
                        >
                            <MenuIcon sx={{ fontSize: "35px", }} />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ color: 'black' }}>
                            Platform Integration
                        </Typography>
                    </Toolbar>
                    <Button onClick={logOut} color='secondary' variant='contained' sx={{ mr: 12 }}>Logout</Button>
                </div>

            </AppBar>


            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} >
                        {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ color: 'black', fontSize: "35px" }} /> : <ChevronLeftIcon sx={{ color: 'black', fontSize: "35px" }} />}
                    </IconButton>
                </DrawerHeader>

                <Divider />
                <List className="text-black bg-gray-100" style={{ height: '100vh', paddingTop: '20px' }}>
                    <ListItem button >
                        <Link to="/dashboard/usersList" className='text-black flex items-center text-lg font-semibold'>
                            <GroupIcon sx={{ mr: 3, fontSize: "30px" }} />
                            <span>USERS LIST</span>
                        </Link>
                    </ListItem>

                    <ListItem button >
                        <Link to="/dashboard/addUser" className='text-black flex items-center text-lg font-semibold'>
                            <PersonAddIcon sx={{ mr: 3, fontSize: "30px" }} />
                            <span>ADD USER</span>
                        </Link>
                    </ListItem>

                    <ListItem button >
                        <Link to="/dashboard/manageUsers" className='text-black flex items-center text-lg font-semibold'>
                            <ManageAccountsIcon sx={{ mr: 3, fontSize: "30px" }} />
                            <span>MANAGE USERS</span>
                        </Link>
                    </ListItem>

                    <ListItem button >
                        <Link to="/" className='text-black flex items-center text-lg font-semibold'>
                            <LoginIcon sx={{ mr: 3, fontSize: "30px" }} />
                            <span>LOGIN PAGE</span>
                        </Link>
                    </ListItem>

                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}