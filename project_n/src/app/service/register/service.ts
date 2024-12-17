
const API_URL = 'http://localhost:3000/api/register';

export async function createUser(data: any) {
    const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
    })
    return res.json();

}