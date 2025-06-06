import axios from "axios";

// Create Order สำหรับ cart
export async function CreateOrder(data: any): Promise<any> {
    try {
        const res = await axios.post("/api/createOrder", data, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create order");
    }
}

// Create Payment
export async function CreatePayment(data: any): Promise<any> {
    try {
        const res = await axios.post("/api/createPayment", data, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create payment");
    }
}

// Update Payment Status When Checked
export async function UpdatePaymentStatusWhenChecked(data: any): Promise<any> {
    try {
        const res = await axios.put("/api/checkPayment", data, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error: any) {
        console.log(error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to update payment status");
    }
}

// Update Order Status
export async function UpdateOrderStatus(data: any): Promise<any> {
    try {
        const res = await axios.put("/api/updateTransport", data, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update order status");
    }
}

// Cancel Order
export async function CancelOrder(orderDetailId: number): Promise<any> {
    try {
        const res = await axios.put(`/api/cancelOrder/${orderDetailId}`, {}, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to cancel order");
    }
}

// Verify Slip
export async function verifySlip(formdata: any): Promise<any> {
    try {
        const res = await axios.post("/api/verifySlip", formdata);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to verify slip");
    }
}
