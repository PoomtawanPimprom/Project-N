export async function getUsedDiscount(){
    const res = await fetch(`/api/useddiscount`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}