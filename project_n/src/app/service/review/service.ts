import axios from "axios";

const PATH_URL_REPORT = "/api/review";

// POST /api/review
export async function createReview(data: any): Promise<any> {
    try {
        const res = await axios.post(PATH_URL_REPORT, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "เกิดข้อผิดพลาดในการสร้างรีวิว");
    }
}

// GET /api/review/:productId
export async function getReviewByProductId(productId: number): Promise<any> {
    try {
        const res = await axios.get(`${PATH_URL_REPORT}/${productId}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลรีวิวได้");
    }
}

// DELETE /api/review/:id
export async function deleteReviewById(reportId: number): Promise<any> {
    try {
        const res = await axios.delete(`${PATH_URL_REPORT}/${reportId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถลบรีวิวได้");
    }
}
