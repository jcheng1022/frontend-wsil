'use client';

import React, {useEffect} from 'react';
import styled from "@emotion/styled";
import UserBanner from "@/components/user/UserBanner";
import {Gap} from "@/components/common";
import UserMonitorTable from "@/components/user/UserMonitorTable";
import {theme} from '@/styles/themes'
import {useAuthContext} from "@/context/AuthContext";

function ViewUser(props) {
    const { socket } = useAuthContext();

    //
    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log('connected ', socket.id);
    //     });
    //
    //     socket.on("trigger", (arg) => {
    //         console.log(arg, 'from server'); // world
    //     });
    // }, [])
    return (
        <Container>
            <UserBanner />

            <Gap gap={24}/>

            <UserMonitorTable/>
        </Container>
    );
}

export default ViewUser;


const Container = styled.div`
  background: linear-gradient(to top, ${theme.primaryOrange}, ${theme.secondaryOrange});
  //height: 100vh;

`
