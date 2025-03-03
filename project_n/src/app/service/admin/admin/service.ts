
export async function updateRoleById(id:string|number,roleId:any) {
    const response = await fetch(`/api/profile/${id}/role`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roleId),
    });
    const res = await response.json();
    if (!response.ok) {
        throw new Error("Failed to update user");
    }
    return res
}