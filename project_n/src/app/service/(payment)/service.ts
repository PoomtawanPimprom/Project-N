//create order
export async function CreateOrder(data:any) {
    const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to create");
    }
} 
//createPayment
export async function CreatePayment(data:any) {
    const res = await fetch("/api/createPayment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

//check payment
export async function CheckStatusPayment(orderId:string|number) {
    const res = await fetch(`/api/checkPayment/${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to create");
    }
}

export async function UpdatePaymentStatusWhenChecked(data:any) {
    const res = await fetch("/api/checkPayment", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to create");
    }
}

//update-transport
export async function UpdateOrderStatus(data:any) {
    const res = await fetch("/api/updateTransport", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to create");
    }
}

//cancel-order
export async function CancelOrder(orderDetailId:number){
    const res = await fetch(`/api/cancelOrder/${orderDetailId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to create");
    }
}

//verifySlip
export async function verifySlip(formdata:any){
    const res = await fetch(`/api/verifySlip`, {
        method: "POST",
        body: formdata
    });
    return res.json()
}

