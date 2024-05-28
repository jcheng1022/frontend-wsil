'use client';
import React, {useState} from 'react';
import {useCurrentUser, useRunById, useRunDataById} from "@/hooks/user.hooks";
import styled from "@emotion/styled";
import {
    Calendar,
    CircleAlert,
    CirclePause,
    CircleX,
    MapPin,
    MapPinned,
    MoreVertical,
    PencilLine, Play,
    Trash
} from "lucide-react";
import dayjs from "dayjs";
import {FlexBox} from "@/components/common";
import {theme} from "@/styles/themes";
import {Button, Tooltip, Menu, UnstyledButton} from "@mantine/core";
import JobManageActionModal from "@/components/job/manage/JobManageActionModal";
import {useDisclosure} from "@mantine/hooks";
// import {Warning} from "postcss";


// const {Label, Item, Dropdown, Divider, Target} = Menu;

function JobHeader({jobId}) {

    const {data:user} = useCurrentUser()

    const {data: job, refetch} = useRunById(!!user?.id, jobId);
    const [opened, { open, close }] = useDisclosure(false);
    const [actionType, setActionType] = useState(null)

    const handleAction =(type) =>  () => {
        setActionType(type)
        open();

    }


    return (
        <Container>
            <FlexBox justify={'space-between'}>
                <div className={'job-id'}> Job ID: {job?.id}</div>

                <FlexBox className={'mobile-actions'} justify={'flex-end'}>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <UnstyledButton><MoreVertical className={'more-icon'} height={24} color={'white'}/></UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Actions</Menu.Label>
                            {/*<Menu.Item leftSection={<PencilLine color={'orange'}/>}>*/}
                            {/*    <span style={{color: 'orange'}}>*/}
                            {/*        Edit*/}
                            {/*    </span>*/}
                            {/*</Menu.Item>*/}
                            {job?.status === 'PAUSED' ? (
                                <Menu.Item onClick={handleAction('RESUME')} leftSection={<Play color={'green'}/>}>
        <span style={{color: 'green'}}>
            Resume
        </span>
                                </Menu.Item>
                            ) : job?.status === 'ACTIVE' ? (
                                <Menu.Item onClick={handleAction('PAUSE')} leftSection={<CirclePause color={'grey'}/>}>
        <span style={{color: 'grey'}}>
            Pause
        </span>
                                </Menu.Item>
                            ) : null}
                            <Menu.Item onClick={handleAction('DELETE')} leftSection={<CircleX color={'red'}/>}>
                                <span style={{color: 'red'}}>
                                    Delete
                                </span>
                            </Menu.Item>

                        </Menu.Dropdown>
                    </Menu>
                </FlexBox>

                <FlexBox className={'browser-actions'} justify={'flex-end'} gap={12}>
                    {/*<Button color={theme.lightOrange}> Edit </Button>*/}
                    {job?.status === 'PAUSED' ? (
                        <Button color={theme.primaryBlue} onClick={handleAction('RESUME')}> Resume </Button>
                    ) : job?.status === 'ACTIVE' ? (
                        <Button color={theme.jetGrey} onClick={handleAction('PAUSE')}> Pause </Button>

                    ): null}
                    <Button color={'red'} onClick={handleAction('DELETE')}> Delete </Button>
                </FlexBox>
            </FlexBox>
            <FlexBox align={'center'} gap={6} className={'job-dates'} >
               <Calendar className={'info-icon'} color={'white'}/>  <span> {dayjs(job?.startDate).format('MM/DD/YY')}</span>
                {job?.endDate && <> - <span>  {dayjs(job?.endDate).format('MM/DD/YY')}</span> </>}
            </FlexBox>
            <FlexBox direction={'column'} align={'flex-start'} gap={6} className={'job-dates'} >
                <Tooltip label={'Origination'}  offset={{ mainAxis: 8, crossAxis: -120  }} position={'top'}  >
                    <FlexBox gap={6}>
                        <MapPin className={'info-icon'} color={'white'}/>
                        <span> {job?.search?.origination}</span>

                    </FlexBox>
                </Tooltip>
                <Tooltip label={'Destination'} offset={{ mainAxis: 8, crossAxis: -120 }} position={'bottom'} >
                    <FlexBox gap={6}>
                        <MapPinned className={'info-icon'} color={'white'} />
                        <span> {job?.search?.destination}</span>
                    </FlexBox>
                </Tooltip>
            </FlexBox>
            <JobManageActionModal opened={opened} refetch={refetch} onClose={close} type={actionType} jobId={jobId} userId={user?.id} />
        </Container>
    );
}

export default JobHeader;


const Container = styled.div`
  background-color: ${theme.secondaryOrange};
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
  
  .mobile-actions {
    display:none;
  }
  
  @media  only screen and (max-width: 768px) {
    
    .browser-actions {
      display:none;
    }
    
    .job-id {
      font-size: 16px;
    }
    
    .mobile-actions {
      display: inherit;
    }
    .info-icon {
      width: 18px;
    }
    
    .job-dates { 
      font-size: 12px;
    }
  }
`
