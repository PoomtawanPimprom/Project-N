//POST /api/product
export async function CreateProdcut(data:any) {
    const res = await fetch('/api/product',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
    });

    if(!res.ok){
        return res.json();
    }
}

//GET /api/product
export async function getAllproduct() {
    const res = await fetch(`/api/product`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

//GET /api/product/:id
export async function getProductById(id:number) {
    const res = await fetch(`/api/product/${id}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

//GET /api/store/product/:storeId
export async function getProductsByStoreId(storeId:number,query?:string)  {
    const res = await fetch(`/api/store/product/${storeId}?${query}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

//PUT /api/product/:id
export async function updateProductbyID(id:number,data:any) {
    const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

//DELETE /api/product/:id
export async function deleteProductByID(id:number) {
    const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}