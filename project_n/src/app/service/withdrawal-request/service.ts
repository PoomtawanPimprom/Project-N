import axios from "axios";

const path = "/api/withdrawal-request";

// create req
export async function createWithDrawalReq(data: any) {
  try {
    const res = await axios.post(`${path}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดจากเซิฟเวอร์"
    );
  }
}

//  get history
export async function getWithDrawalByStoreId(storeId: number | string) {
  try {
    const res = await axios.get(`${path}/store/${storeId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดจากเซิฟเวอร์"
    );
  }
}

// get amonut
export async function getAmountByStoreId(storeId: number | string) {
  try {
    const res = await axios.get(`${path}/${storeId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดจากเซิฟเวอร์"
    );
  }
}

//get All request
export async function getAllDrawalRequestToApprove() {
  try {
    const res = await axios.get(`${path}`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดจากเซิฟเวอร์"
    );
  }
}

//update status approve or reject
export async function updateApproveStatusDrawal(storeId: number | string,adminId:number|string) {
  try {
    const res = await axios.put(`${path}/${storeId}/approve?status=update`,{approvedById:adminId}, {
      headers: { "Content-Type": "application/json" },
    
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดจากเซิฟเวอร์"
    );
  }
}

export async function updateRejectStatusDrawal(storeId: number | string,adminId:number|string) {
  try {
    const res = await axios.put(`${path}/${storeId}/approve?status=reject`,{approvedById:adminId}, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดจากเซิฟเวอร์"
    );
  }
}
