import axios from "axios";

const PATH_URL_REPORT = "/api/report";

// GET /api/report
export async function getAllReport(query: string): Promise<any> {
    try {
        const res = await axios.get(`${PATH_URL_REPORT}?${query}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลรายงานทั้งหมดได้");
    }
}

// POST /api/report
export async function createReport(data: any): Promise<any> {
    try {
        const res = await axios.post(PATH_URL_REPORT, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "เกิดข้อผิดพลาดในการสร้างรายงาน");
    }
}

// GET /api/report/:id
export async function getReportById(reportId: number): Promise<any> {
    try {
        const res = await axios.get(`${PATH_URL_REPORT}/${reportId}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลรายงานตาม ID ได้");
    }
}

// PUT /api/report/:id
export async function updateReportById(reportId: number, data: any): Promise<any> {
    try {
        const res = await axios.put(`${PATH_URL_REPORT}/${reportId}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตรายงาน");
    }
}

// DELETE /api/report/:id
export async function deleteReportById(reportId: number): Promise<any> {
    try {
        const res = await axios.delete(`${PATH_URL_REPORT}/${reportId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถลบรายงานได้");
    }
}

// GET /api/report/users/:userId
export async function getAllReportByUserId(userId: number): Promise<any> {
    try {
        const res = await axios.get(`${PATH_URL_REPORT}/user/${userId}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลรายงานของผู้ใช้ได้");
    }
}
