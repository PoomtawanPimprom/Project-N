// POST /api/store
export async function CreateStore(data: any) {
    const res = await fetch("/api/store", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to create");
    }
}

// GET /api/store/${storeID}
export async function getStoreByID(storeID: number) {
    const res = await fetch(`http://localhost:3000/api/store/${storeID}`, {
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