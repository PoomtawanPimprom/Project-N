import axios from "axios";

// POST /api/product
export async function CreateProduct(data: any): Promise<any> {
    try {
        const res = await axios.post('/api/product', data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "เกิดข้อผิดพลาดในการสร้างสินค้า");
    }
}

// GET /api/product
export async function getAllProduct(): Promise<any> {
    try {
        const res = await axios.get('/api/product', {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลสินค้าทั้งหมดได้");
    }
}

// GET /api/product/:id
export async function getProductById(id: number): Promise<any> {
    try {
        const res = await axios.get(`/api/product/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลสินค้าตาม ID ได้");
    }
}

// GET /api/store/product/:storeId
export async function getProductsByStoreId(storeId: number, query?: string): Promise<any> {
    try {
        const res = await axios.get(`/api/store/product/${storeId}?${query}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลสินค้าของร้านตาม Store ID ได้");
    }
}

// PUT /api/product/:id
export async function updateProductById(id: number, data: any): Promise<any> {
    try {
        const res = await axios.put(`/api/product/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลสินค้าตาม ID ได้");
    }
}

// DELETE /api/product/:id
export async function deleteProductById(id: number): Promise<any> {
    try {
        const res = await axios.delete(`/api/product/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถลบสินค้าตาม ID ได้");
    }
}
