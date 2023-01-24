import { useEffect, useState } from 'react';
import mqtt from 'precompiled-mqtt';
import {mqttUrl, mqttOptions} from '../../services/mqttClient';

const mqttSub = (client, subscription) => {
    if (!client)
        return;
//    const { topic, qos } = subscription;
    const {topic} = subscription;
    client.subscribe(topic, /*{ qos },*/ (error) => {
        if (error)
        {
            console.error('Error subscriping to topic:', error);
            return ;
        }
    })
}

const mqttDisconnect = (client, setConnectStatus) => {
    if (!client)
        return;
    client.end(() => {
        setConnectStatus('Disconnected');
    })
}

const useMqtt = (subscription) => {
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState('Disconnected');
    const [payload, setPayload] = useState({});

    useEffect(() => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(mqttUrl));
    }, []);

    useEffect(() => {
        if (!client)
            return ;
        client.on('connect', () => {
            setConnectStatus('Connected');
            mqttSub(client, subscription);
        });
        client.on('error', (err) => {
            console.error('Connection error: ', err);
            client.end();
        });
        client.on('reconnect', () => {
            setConnectStatus('Reconnecting');
        });
        client.on('message', (topic, message) => {
            const payload = { topic, message: message.toString() };
            setPayload(payload);
            console.log(payload);
            mqttDisconnect(client, setConnectStatus);
        })
    }, [client, subscription])
    console.log(connectStatus);
    return [payload];
}

export default useMqtt;