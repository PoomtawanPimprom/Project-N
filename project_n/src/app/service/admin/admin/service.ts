import axios from 'axios';

export async function updateRoleById(id: string | number, roleId: any): Promise<any> {
    try {
        const response = await axios.put(`/api/profile/${id}/role`, roleId, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "ไม่สามารถอัปเดตบทบาทของผู้ใช้ได้");
    }
}
