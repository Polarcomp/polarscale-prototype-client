import axios from 'axios'
const baseUrl = 'https://vfiomlqwajbenjwswajz.functions.supabase.co/index'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const headers = {
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json'
}

export const getScales = async (user_id) => {
    const params = new URLSearchParams([
        ['user_id', user_id]
    ]);
    const response = await axios.get(`${baseUrl}/scales/scales`, {
        params,
        headers
    });
    return response.data;
}