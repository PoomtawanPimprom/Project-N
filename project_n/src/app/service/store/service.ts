// POST /api/store
export async function CreateStore(data: any) {
    const res = await fetch("/api/store", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // ดึงข้อมูลจากเซิร์ฟเวอร์
    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "เกิดข้อผิดพลาดในการสร้างร้านค้า");
    }
}

// GET /api/store/${storeID}
export async function getStoreByID(storeID: number) {
    const res = await fetch(`/api/store/${storeID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

//PUT /api/store/${storeID}
export async function updateStoreById(storeID: number, data: any) {
    const res = await fetch(`/api/store/${storeID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // ดึงข้อมูลจากเซิร์ฟเวอร์
    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "เกิดข้อผิดพลาดในการสร้างร้านค้า");
    }
}

//DELETE /api/store/${storeID}
export async function deleteListById(storeID: number) {
    const res = await fetch(`/api/store/${storeID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}


export async function checkUserCreatedStore(userId: number) {
    const res = await fetch(`/api/checkStore/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}