
// Get by id
export async function getCartById(id: Number){
    const res = await fetch(`/api/cart/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export const createCart = async (data: any) => {
    try {
        const res = await fetch(`/api/cart`, {
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
export async function updateCartById(id: number, updatedData: any) {
    const response = await fetch(`/api/cart/${id}`, {
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

export async function deleteCartById(id: Number){
    const res = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    });
}