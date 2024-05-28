import React, {useState} from 'react';
import styled from "@emotion/styled";
import {Button, Input, Modal} from "@mantine/core";
import {FlexBox} from "@/components/common";
import {theme} from "@/styles/themes";
import APIClient from '/services/api'
import {notifications} from "@mantine/notifications";
import {useQueryClient} from "@tanstack/react-query";
function ChangeUsernameModal({opened, onClose, }) {
    const [username, setUsername] = useState('');
    const client = useQueryClient();


    const handleConfirm =async () => {

        //validate

        if (username.length < 8 || username.length > 15) {
            return notifications.show({
                color: 'red',
                title: 'Invalid username',
                message: 'Username must be between 8 to 15 characters'
            })
        }
        if (!/^[a-zA-Z0-9]*$/.test(username)) {
            return notifications.show({
                color: 'red',
                title: 'Invalid username',
                message: 'Username must only contain numbers or letters'
            })
        }

        return APIClient.api.patch(`/user/username`, {username}, {
            params: {

            }
        }).then(() => {
            client.refetchQueries({queryKey: ['currentUser']})
            onClose();
        }).catch((e) => {
            notifications.show({
                color: 'red',
                title: 'Something went wrong',
                message: typeof e === 'string' ? e : e?.message,

            })
        })
    }

    return (
        <ModalContainer  overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }} opened={opened} centered onClose={onClose} withCloseButton={false} >

            <div className={'text-lg'}> Give yourself a unique username</div>
            <div className={'text-xs text-slate-400 mb-4'}> Usernames must be between 8 to 15 characters and must only contain numbers or letters</div>

            <Input onChange={(e) => setUsername(e.target.value)} placeholder={'mynewusername'} />
            <Button className={'button-container'} onClick={handleConfirm} color={'blue'}>Confirm</Button>
        </ModalContainer>
    );
}

export default ChangeUsernameModal;

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
