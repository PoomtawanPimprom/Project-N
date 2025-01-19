const PATH_URL_REPORT = "/api/review"

//POST /api/review
export async function createReview(data:any) {
    const res = await fetch(`${PATH_URL_REPORT}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
    });
    return res.json();
}

//GET /api/review/:productId
export async function getReviewByProductId(productId:number) {
    const res = await fetch(`${PATH_URL_REPORT}/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

//DELETE  /api/review/:id
export async function deleteReviewById(reportId:number) {
    const res = await fetch(`${PATH_URL_REPORT}/${reportId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}
