const PATH_API = "/api/inventory"

//GET /api/inventory/prodect/:prodectId
export async function getInventoryByProductId(prodectId:number) {
    const res = await fetch(`${PATH_API}/product/${prodectId}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

//GET /api/inventory/:prodectId
export async function getInventoriesByProductId(productId:number,query:string){
    const res = await fetch(`${PATH_API}/${productId}?${query}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

//PUT /api/inventory/:inventortId
export async function updateInventoryByInventoryId(InvenId:number, invenData:any) {
    const res = await fetch(`${PATH_API}/${InvenId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(invenData),
    });
}

//DELETE /api/inventory/:inventortId
export async function deleteInventoryByInventoryId(InvenId:number) {
    const res = await fetch(`${PATH_API}/${InvenId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}