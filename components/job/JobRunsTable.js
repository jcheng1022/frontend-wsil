'use client';
import React, {useMemo, useState, useEffect} from 'react';
import styled from "@emotion/styled";
import {useCurrentUser, useRunDataById} from "@/hooks/user.hooks";
import {, Table, } from "@mantine/core";
import dayjs from "dayjs";
import {FlexBox} from "@/components/common";
import {CheckIcon,  X} from "lucide-react";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {firestoreClient} from "@/lib/firebase/firebase";

function JobRunsTable({jobId}) {
    const {data:user} = useCurrentUser()

    const [props, setProps] = useState({
        lastUpdated: null
    })

    const [updateValue, loading, error] = useDocumentData(doc(firestoreClient, `user/${user?.firebaseUuid}/run/${jobId}`), {
        snapshotListenOptions: { includeMetadataChanges: true } } )

    const {data: jobData, refetch: refetchRunData} = useRunDataById(!!user?.id, jobId, props);

    useEffect(() => {

        if (updateValue?.lastUpdated && updateValue?.lastUpdated !== props.lastUpdated) {
            setProps({
                ...props,
                lastUpdated: updateValue?.lastUpdate,
            })

            refetchRunData();
        }
    }, [updateValue, jobData])

    const tableRows = useMemo(() => {


        return jobData?.map((element, index) => {

            return (
                <Table.Tr key={element.id} >
                    <Table.Td>{index + 1}</Table.Td>

                    <Table.Td>{dayjs(element?.createdAt).format('MMM DD YYYY hh:ss a')}</Table.Td>
                    <Table.Td>{element?.target}</Table.Td>
                    <Table.Td>{element.result}</Table.Td>
                    <Table.Td>{element?.notificationSent ? <CheckIcon color={'green'}/> : <X color={'red'}/> }</Table.Td>

                </Table.Tr>
            )
        })
    }, [jobData])


    const getUpdatedDiffText = (seconds) => {
        if (seconds <60) {
            return `${seconds} seconds ago`
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60)
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
        } else if (seconds < 86400) {
            const hours = Math.floor(seconds / 3600)
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
        } else {
            const days = Math.floor(seconds / 86400)
            return `${days} ${days === 1 ? 'day' : 'days'} ago`
        }
    }

    return (
        <Container>
            <FlexBox justify={'flex-end'}>
                Updated {getUpdatedDiffText(dayjs().diff(dayjs.unix(updateValue?.lastUpdated), 'seconds'))}
            </FlexBox>
            <Table striped highlightOnHover withTableBorder withColumnBorders stickyHeader stickyHeaderOffset={60}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Date & Time</Table.Th>
                        <Table.Th>Target</Table.Th>
                        <Table.Th>Result</Table.Th>

                        <Table.Th>Notification Sent</Table.Th>



                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{tableRows}</Table.Tbody>
            </Table>
        </Container>
    );
}

export default JobRunsTable;

const Container = styled.div`
  padding: 24px;
  //.mantine-Table-table {
  //  margin: 24px;
  //}

`
