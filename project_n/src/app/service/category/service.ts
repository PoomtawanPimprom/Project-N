//GET /api/categories
export async function getAllCategory() {
    const res = await fetch(`/api/category`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}