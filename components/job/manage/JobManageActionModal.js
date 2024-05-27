import React from 'react';
import styled from "@emotion/styled";
import {Button, Modal} from "@mantine/core";
import {FlexBox} from "@/components/common";
import {theme} from "@/styles/themes";
import APIClient from '/services/api'
import {notifications} from "@mantine/notifications";
function JobManageActionModal({opened, onClose, type = 'PAUSE', jobId, userId }) {

    console.log(type, '2323')

    const handleConfirm =async () => {
        return APIClient.api.patch(`/distance/run/${jobId}/status`, {}, {
            params: {
                status: type
            }
        }).then(() => {
            onClose();
        }).catch((e) => {
            notifications.show({
                color: 'red',
                title: 'Something went wrong',
                message: typeof e === 'string' ? e : e?.message,

            })
        })
    }

    const title = type === 'PAUSE' ? 'Pause Job' : 'Delete Job';
    const confirmText = type === 'PAUSE' ? `Are you sure you want to pause this monitoring job?` : `Are you sure you want to delete this monitoring job?`;
    const disclaimerText = type === 'PAUSE' ? `This job will be paused and will not be monitored until you resume it.` : `This job will be deleted and cannot be recovered.`;
    return (
        <ModalContainer  overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }} opened={opened} centered onClose={onClose} withCloseButton={false} >

            <div className={'confirm-text'}>
                {confirmText}
            </div>

            <div className={'disclaimer-text'}>
                {disclaimerText}
            </div>

            <FlexBox className={'button-container'} justify={'center'} gap={10}>
                <Button color={'grey'}>
                    Cancel
                </Button>
                <Button color={type === 'PAUSE' ? theme.primaryBlue : 'red'} onClick={handleConfirm}>
                    Confirm
                </Button>
            </FlexBox>
        </ModalContainer>
    );
}

export default JobManageActionModal;

const ModalContainer = styled(Modal)`
  .button-container {
    margin-top: 24px;
  }

  .confirm-text {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .disclaimer-text {
    font-size: 14px;
    color: grey;
    margin-bottom: 16px;
  }
`
