'use client';

import styled from "@emotion/styled";
import UserBanner from "@/components/user/UserBanner";
import {Gap} from "@/components/common";
import UserMonitorTable from "@/components/user/UserMonitorTable";
import {theme} from '@/styles/themes'

function ViewUser(props) {

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
  min-height: 100vh;
  //height: 100vh;

`
