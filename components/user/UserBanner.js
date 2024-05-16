'use client';
import React from 'react';
import styled from "@emotion/styled";
import {useCurrentUser} from "@/hooks/user.hooks";
import {theme} from "@/styles/themes";

function UserBanner(props) {
    const {data: user} = useCurrentUser();
    return (
        <Container>
            <div className={'user-username'}> {user?.username}</div>
        </Container>
    );
}

export default UserBanner;

const Container = styled.div`
  padding: 24px;
  height: 200px;
  // background: linear-gradient(to left, ${theme.primaryOrange}, ${theme.secondaryOrange});
  
  .user-username {
    font-size: 3.5rem;
    font-weight: 700;
    color: white;
  }
`
