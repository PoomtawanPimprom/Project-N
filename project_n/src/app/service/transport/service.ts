const API_URL = '/api/transport'

export async function GetAllTransport() {
    const res = await fetch(`${API_URL}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    )
    return res.json()
}