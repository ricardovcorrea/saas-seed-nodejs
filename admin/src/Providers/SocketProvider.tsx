import React, { useEffect, useCallback } from 'react';
import SocketIO from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { setStatisticsAction } from '../Reducers/Statistics';

import { baseUrl } from '../General/Constants';

export let SocketClient: SocketIOClient.Socket;

const SocketEventsEnum = {
    STATISTICS_UPDATE: 'statistics-update'
}

export const SocketProvider = (props: any) => {
    const dispatch = useDispatch();
    
    const initializeListeners = () => {
        SocketClient.on(SocketEventsEnum.STATISTICS_UPDATE, (statistics: any) => dispatch(setStatisticsAction(statistics)));
    }

    const connect = useCallback(() => {
        SocketClient = SocketIO(baseUrl);

        SocketClient.emit('statistics-client-connect');

        initializeListeners();
    }, []);

    const disconnect = useCallback(() => {
        SocketClient.disconnect();
    }, []);
    
    useEffect(() => {
        connect();

        return () => {
            disconnect();
        }
    }, [connect]);

    return <div></div>;
}