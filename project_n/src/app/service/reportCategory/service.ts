const PATH_URL = "/api/reportcategory"

//GET /api/report
export async function getAllReportCategoies () {
    const res = await fetch(`${PATH_URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}
