import axios from 'axios'
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

export const getHistory = async ({range, userId}) => {
    const params = new URLSearchParams([
        ['range', range],
        ['user_id', userId]
    ]);
    const response = await axios.get(`${baseUrl}/scales/history`, {
        params,
        headers
    });
    return parseHistData(response);
}

export const getTotal = async ({range, userId}) => {
    const params = new URLSearchParams([
        ['range', range],
        ['user_id', userId]
    ]);
    const response = await axios.get(`${baseUrl}/scales/accumulated`, { params, headers });
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