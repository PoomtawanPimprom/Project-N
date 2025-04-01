import axios from 'axios';

const PATH_API = "/api/transport";

//GET /api/transport
export async function getAllTransport() {
    try {
        const response = await axios.get(`${PATH_API}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลการขนส่งได้");
    }
}

//POST /api/transport
export async function createTransport(data: any) {
    try {
        const response = await axios.post(`${PATH_API}/`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถสร้างข้อมูลการขนส่งได้");
    }
}

//DELETE /api/transport
export async function deleteTransportByTransportId(id: number) {
    try {
        const response = await axios.delete(`${PATH_API}/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถลบข้อมูลการขนส่งได้");
    }
}
