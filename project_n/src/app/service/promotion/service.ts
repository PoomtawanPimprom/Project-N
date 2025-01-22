// Get all
export async function getPromotionAll(){
    const res = await fetch(`/api/promotion`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

// Get by id
export async function getPromotionById(id: Number){
    const res = await fetch(`/api/promotion/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export const createPromotion = async (data: any) => {
    try {
        const res = await fetch(`/api/promotion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error('Failed to create promotion');
        }

    } catch (error) {
        console.error("Error creating promotion:", error);
        throw error;
    }
};



// Update by id
export async function updatePromotionById(id: number, updatedData: any) {
    const response = await fetch(`/api/promotion/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }
    return await response.json();
};

export async function deletePromotionById(id: Number){
    const res = await fetch(`/api/promotion/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    });
}