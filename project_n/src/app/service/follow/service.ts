
const PATH_API = "/api/follow"

//POST /api/follow
export async function createFollow(data: any) {
    const res = await fetch(`${PATH_API}/`, {
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

//GET /api/follow/:userId
export async function getAllFollowByUserID(userId: number) {
    const res = await fetch(`${PATH_API}/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    return res.json();
}


//DELETE /api/follow/:favoriteId
export async function deleteFollowByid(followId: any) {
    const res = await fetch(`${PATH_API}/${followId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

//GET /api/follow/:userId/:storeId
export async function checkFollowed(storeId:any, userId:any) {
    const res = await fetch(`${PATH_API}/favorite/${userId}/${storeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    return res.json();
}

