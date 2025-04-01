import axios from 'axios';

const PATH_API = '/api/inventory';

// GET /api/inventory/product/:prodectId
export async function getInventoryByProductId(prodectId: number): Promise<any> {
    try {
        const res = await axios.get(`${PATH_API}/product/${prodectId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถดึงข้อมูลสินค้าจากคลังได้');
    }
}

// GET /api/inventory/:productId
export async function getInventoriesByProductId(productId: number, query: string): Promise<any> {
    try {
        const res = await axios.get(`${PATH_API}/${productId}?${query}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถดึงข้อมูลสินค้าจากคลังได้');
    }
}

// PUT /api/inventory/:inventoryId
export async function updateInventoryByInventoryId(InvenId: number, invenData: any): Promise<any> {
    try {
        const res = await axios.put(`${PATH_API}/${InvenId}`, invenData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถอัปเดตข้อมูลคลังสินค้าได้');
    }
}

// DELETE /api/inventory/:inventoryId
export async function deleteInventoryByInventoryId(InvenId: number): Promise<any> {
    try {
        const res = await axios.delete(`${PATH_API}/${InvenId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'ไม่สามารถลบข้อมูลคลังสินค้าได้');
    }
}
