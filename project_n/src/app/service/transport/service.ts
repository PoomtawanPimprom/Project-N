import axios from 'axios';

const API_URL = '/api/transport';

export async function GetAllTransport(): Promise<any> {
    try {
        const res = await axios.get(API_URL, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch transport data');
    }
}
