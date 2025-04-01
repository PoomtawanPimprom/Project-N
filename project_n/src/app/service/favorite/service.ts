import axios from 'axios';

const PATH_API = "/api";

// POST /api/favorite
export async function createFavorite(data: any): Promise<any> {
    try {
        const res = await axios.post(`${PATH_API}/favorite`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถสร้างรายการโปรดได้");
    }
}

// GET /api/favorite/:productId/:userId
export async function getFavoriteByProductIdAndUserId(productId: any, userId: any): Promise<any> {
    try {
        const res = await axios.get(`${PATH_API}/favorite/${productId}/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลรายการโปรดได้");
    }
}

// GET /api/favorite/:userId
export async function getAllFavoriteByUserID(userId: number): Promise<any> {
    try {
        const res = await axios.get(`${PATH_API}/favorite/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงรายการโปรดทั้งหมดได้");
    }
}

// DELETE /api/favorite/:favoriteId
export async function deleteFavoriteByid(favoriteId: any): Promise<void> {
    try {
        await axios.delete(`${PATH_API}/favorite/${favoriteId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถลบรายการโปรดได้");
    }
}
