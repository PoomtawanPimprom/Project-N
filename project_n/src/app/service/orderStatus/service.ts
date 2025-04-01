import axios from 'axios';

const API_URL = '/api/orderStatus';

// GET /api/orderStatus
export async function GetAllOrderStatus(): Promise<any> {
    try {
        const res = await axios.get(API_URL, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถดึงข้อมูลสถานะคำสั่งซื้อได้');
    }
}
