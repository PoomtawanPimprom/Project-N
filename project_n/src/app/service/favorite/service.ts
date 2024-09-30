
const PATH_API = "/api"

//POST /api/favorite
export async function createFavorite(data: any) {
    const res = await fetch(`${PATH_API}/favorite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        return res.json();
    }
}

//GET /api/favorite/:productId/:userId
export async function getFavoriteByProductIdAndUserId(productId:any, userId:any) {
    const res = await fetch(`${PATH_API}/favorite/${productId}/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    return res.json();
}

//GET /api/favorite/:userId
export async function getAllFavoriteByUserID(userId: number) {
    const res = await fetch(`${PATH_API}/favorite/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    return res.json();
}

//DELETE /api/favorite/:favoriteId
export async function deleteFavorite(favoriteId: any) {
    const res = await fetch(`${PATH_API}/favorite/${favoriteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}