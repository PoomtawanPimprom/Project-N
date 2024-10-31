const PATH_URL_REPORT = "/api/report"

//GET /api/report
export async function getAllReport (query:string) {
    const res = await fetch(`${PATH_URL_REPORT}?${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

//POST /api/report
export async function createReport(data:any) {
    const res = await fetch(`${PATH_URL_REPORT}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
    });
    return res.json();
}

//GET /api/report/:id
export async function getReportById(reportId:number) {
    const res = await fetch(`${PATH_URL_REPORT}/${reportId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

//PUT  /api/report/:id
export async function updateReportById(reportId:number,data:any) {
    const res = await fetch(`${PATH_URL_REPORT}/${reportId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}


//DELETE  /api/report/:id
export async function deleteReportById(reportId:number) {
    const res = await fetch(`${PATH_URL_REPORT}/${reportId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

//GET /api/report/users/:userId
export async function getAllReportByUserId(userId:number) {
    const res = await fetch(`${PATH_URL_REPORT}/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}