'use client';
import React from 'react';
import {useCurrentUser, useRunById, useRunDataById} from "@/hooks/user.hooks";
import styled from "@emotion/styled";
import {Calendar, MapPin, MapPinned} from "lucide-react";
import dayjs from "dayjs";
import {FlexBox} from "@/components/common";
import {theme} from "@/styles/themes";
import {Tooltip} from "@mantine/core";

function JobHeader({jobId}) {

    const {data:user} = useCurrentUser()

    const {data: job} = useRunById(!!user?.id, jobId);

    return (
        <Container>
            <div className={'job-id'}> Job ID: {job?.id}</div>
            <FlexBox align={'center'} gap={6} className={'job-dates'} >
               <Calendar color={'white'}/>  <span> {dayjs(job?.startDate).format('MM/DD/YY')}</span>
                {job?.endDate && <> - <span>  {dayjs(job?.endDate).format('MM/DD/YY')}</span> </>}
            </FlexBox>
            <FlexBox direction={'column'} align={'flex-start'} gap={6} className={'job-dates'} >
                <Tooltip label={'Origination'}  offset={{ mainAxis: 8, crossAxis: -120  }} position={'top'}  >
                    <FlexBox gap={6}>
                        <MapPin color={'white'}/>
                        <span> {job?.search?.origination}</span>

                    </FlexBox>
                </Tooltip>
                <Tooltip label={'Destination'} offset={{ mainAxis: 8, crossAxis: -120 }} position={'bottom'} >
                    <FlexBox gap={6}>
                        <MapPinned color={'white'} />
                        <span> {job?.search?.destination}</span>
                    </FlexBox>
                </Tooltip>
            </FlexBox>
        </Container>
    );
}

export default JobHeader;


const Container = styled.div`
  background-color: ${theme.primaryOrange};
  min-height: 200px;
  padding: 24px;
  
  .job-id {
    font-size: 24px;
    font-weight: 600;
    color: white;
  }
  
  .job-dates {
    margin-top:8px;
    font-weight: 500;
    color: white;
  }
  
  @media  only screen and (max-width: 768px) {
    svg {
      width: 18px;
    }
    .job-dates { 
      font-size: 12px;
    }
  }
`
