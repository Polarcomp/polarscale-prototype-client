import axios from 'axios'
const baseUrl = 'http://localhost:8081'

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

export const getHistory = async ({range}) => {
    const params = new URLSearchParams([
        ['range', range]
    ]);
    const response = await axios.get(`${baseUrl}/scales/history`, { params });
    return parseHistData(response);
}

export const getTotal = async ({range}) => {
    const params = new URLSearchParams([
        ['range', range]
    ]);
    const response = await axios.get(`${baseUrl}/scales/accumulated`, { params });
    return parseHistData(response);
}

export const getLastestAll = async () => {
    const response = await axios.get(`${baseUrl}/scales/latest`);
    try {
        return (response.data);
    }
    catch (error) {
        console.error(error);
    }
}