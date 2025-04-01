import axios from "axios";

// POST /api/store
export async function CreateStore(data: any): Promise<any> {
    try {
        const res = await axios.post("/api/store", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "เกิดข้อผิดพลาดในการสร้างร้านค้า");
    }
}

// GET /api/store/${storeID}
export async function getStoreByID(storeID: number): Promise<any> {
    try {
        const res = await axios.get(`/api/store/${storeID}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลร้านค้าได้");
    }
}

// PUT /api/store/${storeID}
export async function updateStoreById(storeID: number, data: any): Promise<any> {
    try {
        const res = await axios.put(`/api/store/${storeID}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตร้านค้า");
    }
}

// DELETE /api/store/${storeID}
export async function deleteListById(storeID: number): Promise<any> {
    try {
        const res = await axios.delete(`/api/store/${storeID}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "เกิดข้อผิดพลาดในการลบร้านค้า");
    }
}

// GET /api/checkStore/${userId}
export async function checkUserCreatedStore(userId: number): Promise<any> {
    try {
        const res = await axios.get(`/api/checkStore/${userId}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถตรวจสอบร้านค้าของผู้ใช้ได้");
    }
}

// GET /api/store/${storeID}/dashboard
export async function getInfomationForDashboardByStoreID(storeID: number): Promise<any> {
    try {
        const res = await axios.get(`/api/store/${storeID}/dashboard`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูล Dashboard ของร้านค้าได้");
    }
}
