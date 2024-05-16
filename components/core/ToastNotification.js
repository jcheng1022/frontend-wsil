import React from 'react';

function ToastNotification({notification}) {
    return (
        <div>

            <div> {notification.title}</div>
            <div> {notification.body}</div>
        </div>
    );
}

export default ToastNotification;
