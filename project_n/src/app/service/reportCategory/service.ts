import axios from "axios";

const PATH_URL = "/api/reportcategory";

// GET /api/report
export async function getAllReportCategories(): Promise<any> {
    try {
        const res = await axios.get(PATH_URL, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลประเภทรายงานได้");
    }
}
