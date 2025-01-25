const API_URL = '/api/orderItem'

export async function GetAllOrderItemsToRecevie(userId:number) {
    const res = await fetch(`${API_URL}/toReceive/${userId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    )
    return res.json()
}

export async function updateStatusOrderItemsToRecevie(userId:number) {
    const res = await fetch(`${API_URL}/toReceive/${userId}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }
    )
    return res.json()
}

export async function GetAllOrderItemsComplete(userId:number) {
    const res = await fetch(`${API_URL}/complete/${userId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    )
    return res.json()
}

export async function GetAllOrderItemsCancel(userId:number) {
    const res = await fetch(`${API_URL}/cancel/${userId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    )
    return res.json()
}