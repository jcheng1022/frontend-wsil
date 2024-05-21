'use client'

import {createContext, useContext, useEffect, useState} from "react";
import {auth, firebaseApp, onForegroundMessage} from "@/lib/firebase/firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {io} from "socket.io-client";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

import APIClient from '../services/api'
import {toast, ToastContainer} from "react-toastify";
import useFcmToken from "@/hooks/useFcmToken";
import {useQueryClient} from "@tanstack/react-query";
import {useCurrentUser} from "@/hooks/user.hooks";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);


export const AuthContextProvider = ({
                                        children,
                                    }) => {
    const { fcmToken,notificationPermissionStatus } = useFcmToken();
    const {data: user} =useCurrentUser();

    const [loading, setLoading] = useState(true);
    const client = useQueryClient();


    const logOut = async () => {
        await auth.signOut()
        if (window) {
            return window.location.href = window.location.href

        }

    }

    const handleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // window.location.href = window.location.href

            }).catch((error) => {
            console.log(`Error signing in: ${error}`)
            // Handle Errors here.

        })}

    // const socket = io('https://backend-wsil-production.up.railway.app');


    const settings = {
        handleSignIn,
        // socket,
        // user: currentUser,
        logOut,
        initializingAuth: loading
    }



    function requestPermission() {
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.')

                const messaging = getMessaging(firebaseApp);

                getToken(messaging, {vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY})
                    .then(async (token) => {

                        console.log(`Got Token`, token)

                        await APIClient.api.post(`/user/fcm`, {token}).then(() => {
                            console.log('Token sent to server')
                            client.refetchQueries({queryKey: ['currentUser']})
                        })
                    }).catch((e) => console.log(`Failed to get token: ${e}`))

            }
        }).catch(e => {
            console.error('Error requesting notification permission: ', e);
        })}




    useEffect(() => {

        if (user) {
            requestPermission();
        }

    },[user])
    useEffect(() => {

        const messaging = getMessaging(firebaseApp);

        const onForegroundMessage = () =>
            new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));


        onForegroundMessage()
            .then((payload) => {
                console.log('Received foreground message: ', payload);
                const { notification: { title, body } } = payload;
                toast(<div>
                    <div> {title}</div>
                    <div> {body}</div>
                </div>);
            })
            .catch(err => console.log('An error occured while retrieving foreground message. ', err));
    }, []);


    return (
        <AuthContext.Provider value={settings}>

            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
            />
        </AuthContext.Provider>
    );
};
