
export async function getPromotionEnadleAll(){
    const res = await fetch(`/api/discount/checkEnable`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

// Get all
export async function getPromotionAll(){
    const res = await fetch(`/api/discount`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

// Get by id
export async function getPromotionById(id: Number){
    const res = await fetch(`/api/discount/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export const createPromotion = async (data: any) => {
    try {
        const res = await fetch(`/api/discount`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error('Failed to create discount');
        }

    } catch (error) {
        console.error("Error creating discount:", error);
        throw error;
    }
};



// Update by id
export async function updatePromotionById(id: number, updatedData: any) {
    const response = await fetch(`/api/discount/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Failed to update discount");
    }
    return await response.json();
};

export async function deletePromotionById(id: Number){
    const res = await fetch(`/api/discount/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    });
}