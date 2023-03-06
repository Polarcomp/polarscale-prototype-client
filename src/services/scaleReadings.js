import axios from 'axios'
import { getLastMonday, getEndOfWeek } from '../shared/helpers';

const baseUrl = 'https://vfiomlqwajbenjwswajz.functions.supabase.co/index'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const parseHistData = (response) => {
    try {
        return ({
            timePeriod: response.data.timePeriod,
            readings: response.data.readings
        });
    }
    catch (error) {
        console.error(error);
    }
}

const headers = {
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json'
}

export const getQuery = async({range, userId, endpoint}) => {
    const params = new URLSearchParams([
        ['range', range],
        ['user_id', userId]
    ]);
    const response = await axios.get(`${baseUrl}/scales/${endpoint}`, { params, headers });
    return parseHistData(response);
}

export const getLastestAll = async (user_id) => {
    const params = new URLSearchParams([
        ['user_id', user_id]
    ])
    const response = await axios.get(`${baseUrl}/scales/latest`, { params, headers } );
    try {
        return (response.data);
    }
    catch (error) {
        console.error(error);
    }
}

export const getDaily = async ({ userId, endpoint }) => {
    const lastMonday = getLastMonday().getTime() / 1000;
    const endOfWeek = Math.floor(getEndOfWeek().getTime() / 1000);
    const params = new URLSearchParams([
        ['start', lastMonday],
        ['stop', endOfWeek],
        ['user_id', userId]
    ]);
    const response = await axios.get(`${baseUrl}/scales/${endpoint}`, { params, headers });
    response.data.readings.shift();
    response.data.readings = response.data.readings.map(reading => {
        let offset = new Date(reading.timestamp * 1000);
        offset = offset.getTimezoneOffset() * 60;
        const timestamp = reading.timestamp + offset;
        return { ...reading, timestamp: timestamp }
    })
    try {
        return { ...response.data }
    }
    catch (error) {
        console.error(error);
    }
}