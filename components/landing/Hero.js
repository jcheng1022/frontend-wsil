'use client';


import styled from "@emotion/styled";
import {FlexBox} from "@/components/common";
import {theme} from "@/styles/themes";
import {Button} from "@mantine/core";
import {useRouter} from "next/navigation";

export default function Hero() {
    const router = useRouter()
    return (
        <Container justify={'center'} align={'center'} direction={'column'}>
            {/*<div className={'hero-title'}> When Should I Leave ?</div>*/}
            <div className={'hero-title'}>
                No one wants to check every minute to see when traffic is optimal.
            </div>

                <div className={'hero-cta-text'}>{"So we'll do it for you"}</div>
            <Button
                className={'test-btn'}
                onClick={() => router.push('/new')}
                style={{
                    color: 'white',
                    height: 75,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    padding: '8px 36px',
                    fontSize: 17,
                    background: 'linear-gradient(to right, #FFAC81, #FF928B)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
            }}
                color={theme.secondaryOrange} > When Should I Leave? </Button>

        </Container>
    )
}


const Container = styled(FlexBox)`
  //height: 300px;
  
  padding: 125px 48px;
  .hero-title {
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    //margin-bottom: 24px;
    
    background: linear-gradient(to right, ${theme.secondaryOrange},${theme.primaryOrange});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    //margin-bottom: 50px;
    
  }

  
  .hero-cta-text {
    font-size: 2.25rem;
    font-weight: 500;
    font-style: italic;
    background: linear-gradient(to right, ${theme.primaryOrange}, ${theme.secondaryOrange});
    margin-bottom: 50px;
    // background: linear-gradient(to right, ${theme.primaryOrange}, ${theme.secondaryOrange});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .test-btn {
    color: blue;
  }
  
 
  
`
