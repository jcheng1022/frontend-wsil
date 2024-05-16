'use client';

import React, {useEffect} from 'react';
import styled from "@emotion/styled";
import UserBanner from "@/components/user/UserBanner";
import {Gap} from "@/components/common";
import UserMonitorTable from "@/components/user/UserMonitorTable";
import {theme} from '@/styles/themes'
import {socket} from "@/app/layout";
function ViewUser(props) {

    useEffect(() => {
        socket.on("connect", () => {
            console.log('connected ', socket.id); // x8WIv7-mJelg7on_ALbx
        });

        socket.on("trigger", (arg) => {
            console.log(arg, 'from server'); // world
        });
    }, [])
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
  height: 100vh;

`
