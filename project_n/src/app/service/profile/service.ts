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

export async function updateUserById(id: number, updatedData: Partial<userInterface>) {
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
