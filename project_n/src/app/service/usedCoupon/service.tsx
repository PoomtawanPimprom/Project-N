export async function getUsedCoupon(){
    const res = await fetch(`/api/usedcoupon`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}