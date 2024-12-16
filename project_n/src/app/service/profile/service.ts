import { userInterface } from "@/app/interface/userInterface";

export async function getUserById(id: Number){
    const res = await fetch(`/api/profile/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export const updateUserById = async (id: number, updatedData: Partial<userInterface>) => {
    const response = await fetch(`/api/profile/${id}`, {
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
