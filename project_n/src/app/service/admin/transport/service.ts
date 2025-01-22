const PATH_API = "/api/transport"

//GET /api/transport
export async function getAllTransport() {
    const res = await fetch(`/api/transport`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

//POST /api/transport
export async function createTransport(data: any) {
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

//DELETE /api/transport
export async function deleteTransportByTransportId(id: number) {
    const res = await fetch(`${PATH_API}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        
    });

    if (!res.ok) {
        return res.json();
    }
}