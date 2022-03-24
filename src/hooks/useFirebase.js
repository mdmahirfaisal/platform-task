import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from 'sweetalert2'

import initializeFirebase from '../components/Firebase/Firebase.init';
// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(true);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = (location, navigate) => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {

                const destination = location?.state?.from || '/';
                navigate(destination);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,

                })
                setAuthError(error.message)
            })
            .finally(() => setLoading(false));
    }

    // create new user with register
    const registerUser = (email, Password, name, navigate) => {
        createUserWithEmailAndPassword(auth, email, Password)
            .then(() => {
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                navigate('/');
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,

                })
                setAuthError(error.message);
            })
            .finally(() => setLoading(false));
    };

    // all ready create user login
    const loginUser = (email, password, location, navigate) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setUser(user)
                console.log(user.user)
                setAuthError('');
                handleResponse(user.user, location, navigate)
                // reset()
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message} `,

                })
                setAuthError(error.message);
            })
            .finally(() => setLoading(false));
    };


    // handle logged in user
    const handleResponse = (user, location, navigate) => {

        const destination = location?.state?.from || '/dashboard';
        navigate(destination);
        setAuthError('');
        if (user.email === 'admin@gmail.com') {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: ' bg-green-600 px-4 rounded-full text-white text-lg ml-2 px-4 py-0',
                    cancelButton: ' bg-red-600 px-4 rounded-full text-white text-lg me-2 px-4 py-0'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Warning',
                text: 'You have entered the admin panel for testing. Please do not abuse this facility!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ok',
                cancelButtonText: 'No',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'Admin login success',
                        'Now you can check out all the features in the admin panel',
                        'success'
                    )
                }
            })
        };
    };

    // Log out user 
    const logOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth).then(() => {
                    setAuthError('');
                    Swal.fire(
                        'Logged out',
                        'Logged out successfully',
                        'success'
                    )
                }).catch((error) => {
                    setAuthError(error.message);
                })
                    .finally(() => setLoading(false));
            }
        })
    };

    // firebase observer user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setLoading(false)
        })
        return () => unsubscribe;
    }, [auth]);

    return { user, loading, signInWithGoogle, registerUser, loginUser, logOut, setLoading }
};

export default useFirebase;