import axios from 'axios';

const API_URL = '/api/orderItem';

// GET /api/orderItem/toPay/:userId
export async function GetAllOrderDetailToPay(userId: number): Promise<any> {
    try {
        const res = await axios.get(`${API_URL}/toPay/${userId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถดึงข้อมูลคำสั่งซื้อที่ต้องชำระเงินได้');
    }
}

// GET /api/orderItem/waitToShip/:userId
export async function GetAllOrderItemsWaitToShip(userId: number): Promise<any> {
    try {
        const res = await axios.get(`${API_URL}/waitToShip/${userId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถดึงข้อมูลคำสั่งซื้อที่รอการจัดส่งได้');
    }
}

// GET /api/orderItem/toReceive/:userId
export async function GetAllOrderItemsToRecevie(userId: number): Promise<any> {
    try {
        const res = await axios.get(`${API_URL}/toReceive/${userId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถดึงข้อมูลคำสั่งซื้อที่รอรับได้');
    }
}

// PUT /api/orderItem/toReceive/:userId
export async function updateStatusOrderItemsToRecevie(userId: number): Promise<any> {
    try {
        const res = await axios.put(`${API_URL}/toReceive/${userId}`, {}, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถอัปเดตสถานะคำสั่งซื้อที่รอรับได้');
    }
}

// GET /api/orderItem/complete/:userId
export async function GetAllOrderItemsComplete(userId: number): Promise<any> {
    try {
        const res = await axios.get(`${API_URL}/complete/${userId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถดึงข้อมูลคำสั่งซื้อที่เสร็จสมบูรณ์ได้');
    }
}

// GET /api/orderItem/cancel/:userId
export async function GetAllOrderItemsCancel(userId: number): Promise<any> {
    try {
        const res = await axios.get(`${API_URL}/cancel/${userId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถดึงข้อมูลคำสั่งซื้อที่ถูกยกเลิกได้');
    }
}
