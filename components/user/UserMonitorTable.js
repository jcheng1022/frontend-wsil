'use client';

import React from 'react';
import styled from "@emotion/styled";
import {theme} from '@/styles/themes'
import {useCurrentUser, useUserRuns} from "@/hooks/user.hooks";
import {Badge, Table, Tooltip} from "@mantine/core";
import dayjs from "dayjs";
import {FlexBox} from "@/components/common";
import {CirclePause, SquareArrowUpRightIcon} from "lucide-react";
import {useRouter} from "next/navigation";

function UserMonitorTable(props) {
    const {data: user} = useCurrentUser();
    const {data: runs} = useUserRuns(user?.id);
    const router = useRouter();

    const rows = runs?.map((element, index) => {
        let status;

        if (element.status === 'PENDING') {
            status = (
                <Badge
                    size="lg"
                    variant="gradient"
                    gradient={{ from: 'gray', to: 'yellow', deg: 90 }}
                >
                    PENDING
                </Badge>
            )
        } else if (element.status === 'ACTIVE') {
            status = (
                <Badge
                    size="lg"
                    variant="gradient"
                    gradient={{ from: 'lime', to: 'teal', deg: 90 }}
                >
                    ACTIVE
                </Badge>
            )
        }
        return (
            <Table.Tr key={element.id} onClick={() => router.push(`/user/${user.firebaseUuid}/job/${element.id}`)}>
                <Table.Td>{index + 1}</Table.Td>

                <Table.Td>{element?.search?.origination}</Table.Td>
                <Table.Td>{element?.search?.destination}</Table.Td>
                {/*<Table.Td>{element.search?.mode}</Table.Td>*/}
                <Table.Td>{element.targetMinutes}</Table.Td>
                <Table.Td>{element.frequency}</Table.Td>

                <Table.Td>{dayjs(element.startDate).format('M/D/YY h:ss a')}</Table.Td>
                <Table.Td>{dayjs(element.endDate).format('M/D/YY h:ss a')}</Table.Td>

                <Table.Td>
                    <FlexBox wrap={'no-wrap'}>
                        {status}
                    </FlexBox>
                </Table.Td>
                <Table.Td>
                    <FlexBox gap={10} wrap={'no-wrap'}>
                        <Tooltip label={'View'}>
                            <div>
                                <SquareArrowUpRightIcon/>
                            </div>
                        </Tooltip>
                        {/*<Tooltip label={'Edit'}>*/}
                        {/*    <div>*/}
                        {/*        <PencilIcon/>*/}
                        {/*    </div>*/}
                        {/*</Tooltip>*/}
                        <Tooltip label={'Pause'}>
                            <div>
                                <CirclePause/>
                            </div>
                        </Tooltip>
                    </FlexBox>
                </Table.Td>




            </Table.Tr>
        )
    })
    return (
        <Container>
            <Table striped highlightOnHover withTableBorder withColumnBorders stickyHeader stickyHeaderOffset={60}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Origination</Table.Th>
                        <Table.Th>Destination</Table.Th>
                        {/*<Table.Th>Mode</Table.Th>*/}
                        <Table.Th>Target Minutes</Table.Th>

                        <Table.Th>Frequency</Table.Th>
                        <Table.Th>Start Date</Table.Th>
                        <Table.Th>End Date</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th></Table.Th>


                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Container>
    );
}

export default UserMonitorTable;

const Container = styled.div`
  padding: 24px;
  
  
  .mantine-Table-table {
    border-radius: 12px;
  }
   
  

  
  .mantine-Table-th {
    height: 50px;
    text-align: center;
    background-color: ${theme.lightOrange};
    
  }
  
  .mantine-Table-td {
    height: 50px;
    background-color: white;
  }

  // .mantine-Table-tr:nth-of-type(1) {
  //   background-color: ${theme.jetGrey};
  // }
`
