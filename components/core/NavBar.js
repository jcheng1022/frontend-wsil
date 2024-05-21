'use client';

import styled from "@emotion/styled";
import {FlexBox} from "@/components/common";
import {theme} from "@/styles/themes";
import {useAuthContext} from "@/context/AuthContext";
import {useCurrentUser, useUserIsLoggedIn} from "@/hooks/user.hooks";
import {Button} from "@mantine/core";
import {useRouter} from "next/navigation";

export default function NavBar() {
    console.log('NAV RERENDER')
    // const supabase = createClient();
    const router = useRouter();
    const { data: user, isFetching, isLoading,  } = useCurrentUser();
    const fetchingUser = isFetching || isLoading;

    const userUid = useUserIsLoggedIn()


    // const data = supabase.auth.getUser()
    const {logOut, handleSignIn } = useAuthContext()


    const endSection = () => {
        if (userUid && !user && fetchingUser) {
            return <div>Loading...</div>
        }
        if (!userUid && !user) {
            return <Button className={'sign-in-btn'} onClick={() => handleSignIn()}>
                Sign in
            </Button>
        }
        if (userUid && user && !fetchingUser) {

            return (
                <div className={'username'} onClick={() => router.push(`/user/${user?.firebaseUuid}`)}  > {user?.username ? user.username : 'No name yet!'} </div>

            )
        }
    }

    return (
        <Container justify={'space-between'} >
           <div className={'title'} onClick={ () => router.push(`/`)}>
               <span className={'title-start'}> WSI</span><span className={'title-ending'}>L </span>
           </div>

            {endSection()}
        </Container>
    )
}


const Container = styled(FlexBox)`
  max-height: 80px;
 
  padding: 24px 24px;
  
  .title {
    font-size: 24px;
    letter-spacing: 2px;
    font-weight: 700;
  }
  
  .title-ending {
    color: #ff9966;
  }
  
  .title:hover {
    cursor: pointer;
    .title-start {
      color: ${theme.secondaryOrange};
      border-bottom: 5px solid ${theme.secondaryOrange};

    }
    .title-ending {
      color: black;
    }
  }

`

