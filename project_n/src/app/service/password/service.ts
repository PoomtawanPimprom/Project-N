export async function updatePassword(id: number, data: { passwordCurrent: string; passwordNew: string }) {
    const response = await fetch(`/api/password/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error || "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
    }

    return responseData;
}
