import axios from 'axios'
import { secondsInWeek } from '../shared/constants';
import { getLastMonday, getEndOfWeek } from '../shared/helpers';

const baseUrl = 'https://vfiomlqwajbenjwswajz.functions.supabase.co/index'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const headers = {
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json'
}

export const getQuery = async({range, userId, endpoint}) => {
    const params = new URLSearchParams([
        ['range', range],
        ['user_id', userId]
    ]);
    try {
        const response = await axios.get(`${baseUrl}/scales/${endpoint}`, { params, headers });
        return (response.data);
    }
    catch (error) {
        console.error(error);
    }
}

export const getLastestAll = async (user_id) => {
    const params = new URLSearchParams([
        ['user_id', user_id]
    ])
    try {
        const response = await axios.get(`${baseUrl}/scales/latest`, { params, headers } );
        return (response.data);
    }
    catch (error) {
        console.error(error);
    }
}

export const getDaily = async ({ userId, endpoint, range }) => {
    if (range < 1 || range > 4)
        range = 1;
    const weekOffset = secondsInWeek * (range - 1);
    const lastMonday = getLastMonday().getTime() / 1000 - weekOffset;
    const endOfWeek = Math.floor(getEndOfWeek().getTime() / 1000);
    const params = new URLSearchParams([
        ['start', lastMonday],
        ['stop', endOfWeek],
        ['user_id', userId]
    ]);
    try {
        const response = await axios.get(`${baseUrl}/scales/${endpoint}`, { params, headers });
        response.data.readings.shift();
        response.data.readings = response.data.readings.map((reading, index)=> {
            const backShift = index < response.data.readings.length - 1;
            let offset = new Date(reading.timestamp * 1000);
            offset = offset.getTimezoneOffset() * 60;
            const timestamp = reading.timestamp + offset - backShift;
            return { ...reading, timestamp: timestamp }
        });
        return { ...response.data }
    }
    catch (error) {
        console.error(error);
    }
}