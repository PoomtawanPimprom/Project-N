const API_URL = '/api/orderStatus'

export async function GetAllOrderStatus() {
    const res = await fetch(`${API_URL}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    )
    return res.json()
}