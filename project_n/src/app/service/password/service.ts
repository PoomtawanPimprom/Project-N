export async function updatePassword(id: number, data: { passwordCurrent: string; passwordNew: string }) {
    const response = await fetch(`/api/password/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
    }
    return await response.json();
}
