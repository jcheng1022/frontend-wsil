'use client';
import React from 'react';
import {useCurrentUser, useRunById, useRunDataById} from "@/hooks/user.hooks";
import styled from "@emotion/styled";
import {Calendar} from "lucide-react";
import dayjs from "dayjs";
import {FlexBox} from "@/components/common";

function JobHeader({jobId}) {

    const {data:user} = useCurrentUser()

    const {data: job} = useRunById(!!user?.id, jobId);

    return (
        <Container>
            <div> Job ID: ${job?.id}</div>
            <FlexBox align={'center'} gap={6}>
               <Calendar/>  <span> {dayjs(job?.startDate).format('MM/DD/YY')}</span>
                {job?.endDate && <> - <span>  {dayjs(job?.endDate).format('MM/DD/YY')}</span> </>}
            </FlexBox>
        </Container>
    );
}

export default JobHeader;


const Container = styled.div`

  padding: 24px;
`
