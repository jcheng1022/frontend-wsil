import {auth} from "@/lib/firebase/firebase";
import {useQuery} from "@tanstack/react-query";
import {defaultQueryProps} from "@/app/providers";
import {onAuthStateChanged} from "firebase/auth";

import APIClient from '../services/api'
import {useState} from "react";

export const useUserIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    onAuthStateChanged(auth,  (user) => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }})

    return isLoggedIn
}

export const useCurrentUser = ( props = {})  => {

    const queryKey = ['currentUser', props];

    const uid = auth.currentUser?.uid


    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!uid && APIClient.isReady,
        retry: 5,
        queryFn: () => APIClient.api.get(`/user/me`, { params: props})
    })


}


export const useUserRuns = ( userId,  props = {})  => {

    const queryKey = ['runs', userId, props];



    return useQuery({
        queryKey,
        ...defaultQueryProps,
        enabled: !!userId,
        retry: 5,
        queryFn: () => APIClient.api.get(`/distance/runs`, { params: props})
    })


}
