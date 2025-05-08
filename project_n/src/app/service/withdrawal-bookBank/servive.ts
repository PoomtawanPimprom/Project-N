import axios from "axios";

const path = `/api/withdrawal-bookBank`;

export async function createBookBank(data: any) {
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

export async function getAllBookBankByUserId(userId: number) {
  try {
    const res = await axios.get(`${path}/${userId}`, {
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

export async function updateBookBankById(bookBankId: number, data: any) {
  try {
    const res = await axios.put(`${path}/${bookBankId}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดจากเซิฟเวอร์"
    );
  }
}

export async function deleteBookBankById(bookBankId:number) {
    try {
        const res = await axios.delete(`${path}/${bookBankId}`, {
          headers: { "Content-Type": "application/json" },
        });
        return res.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "เกิดข้อผิดพลาดจากเซิฟเวอร์"
        );
      }
}