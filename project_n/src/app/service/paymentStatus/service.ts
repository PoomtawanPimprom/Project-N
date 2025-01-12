const API_URL = '/api/paymentStatus'

export async function GetAllPaymentStatus() {
    const res = await fetch(`${API_URL}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    )
    return res.json()
}