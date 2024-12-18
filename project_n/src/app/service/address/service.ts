import { userAddressInterface } from "@/app/interface/userAddressInterface";


export const getUserAddress = async (id: Number) => {
    const res = await fetch(`/api/address/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch user address");
    }
    return res.json();
}

export const updateUserAddress = async (id: Number, updatedData: Partial<userAddressInterface>) => {
    const response = await fetch(`/api/address/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Failed to update address");
    }
    return await response.json();
};

export const createAddress = async (data:any) => {
    const res = await fetch(`/api/address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
    })
    if(!res.ok){
        return res.json();
    }
}

export const deleteAddress = async (id: Number) => {
    await fetch(`/api/address/${id}`, {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}
 