import { z, ZodSchema } from "zod";


export function validateWithZod<T>(schema: ZodSchema<T>, data: unknown) {
    const result = schema.safeParse(data);
    //case error
    if (!result.success) {
        const errors = result.error.errors.reduce((acc, error) => {
            const field = error.path[0] as string; // ใช้ path[0] เป็นชื่อฟิลด์
            acc[field] = { message: error.message }; // เก็บข้อความข้อผิดพลาด
            return acc;
          }, {} as { [key: string]: { message: string } });
      
          // โยนข้อผิดพลาดเป็นออบเจ็กต์
          throw { fieldErrors: errors };
    }
    return result.data;
}

export const renderError = (error: unknown): { message: string } => {
    return { message: error instanceof Error ? error.message : "An Error!!!" };
};

// schema
//========================================================

//register
export const RegisterSchema = z.object({
    username: z.string().min(3, "Username ควรมีมากกว่า 3 ตัวอักษร"),
    email: z.string().email("โปรดกรอก E-mail ให้ถูกต้อง"),
    password: z.string().min(8, "Password ควรมีมากกว่า 8 ตัวอักษร"),
});

//login
export const LoginSchema = z.object({
    username: z.string().min(1, "โปรดกรอก username"),
    password: z.string().min(1, "โปรดกรอก password"),
})

//report
export const ReportSchema = z.object({
    comment: z.string().min(1, "ข้อความรายงานควรมากกว่า 1 ตัวอักษร").max(200, "ข้อความรายงานไม่ควรเกิน 1 ตัวอักษร"),
    selectCate: z.number().min(1, "โปรดเลือกหมวดหมู่"),
})

//store
export const StoreSchema = z.object({
    name: z
        .string()
        .min(1, "โปรดกรอกชื่อร้านค้า")
        .max(50, "ชื่อร้านค้าควรไม่มากกว่า 50 ตัวอักษร"),
    description: z
        .string()
        .min(1, "โปรดกรอกรายละเอียดร้านค้า")
        .max(200, "รายละเอียดร้านค้าควรไม่มากกว่า 200 ตัวอักษร ")
        .optional(),

    imageLogoURL: z.string().optional(),
    imageLogoFileName: z.string().optional(),

    imageBackgroundURL: z.string().optional(),
    imageBgFileName: z.string().optional(),
});

//product
export const productSchema = z.object({
    name: z
      .string()
      .min(1, "กรุณากรอกชื่อสินค้า")
      .max(100, "ชื่อสินค้าความยาวเกินกำหนด"),
    description: z
      .string()
      .min(1, "กรุณากรอกรายละเอีดยสินค้า")
      .max(200, "รายละเอีดยสินค้าความยาวเกินกำหนด"),
    price: z.number().min(1, "กรุณากรอกราคาสินค้า"),
    storeID: z.number().min(1),
    categoryID: z.number().min(1, "กรุณากรอกราคาสินค้า"),
    image: z.object({}).optional(), // เปลี่ยนจาก image เป็น images และใช้ object แทน array
    inventory: z
      .object({
        quantity: z.number().optional(),
        size: z.string().optional(),
        color: z.string().optional(),
      })
      .optional(),
  });

//review
export const reviewSchema = z.object({
    comment: z.string().min(1, "โปรดกรอกข้อความ").max(100, "เกินข้อความที่กำหนด"),
  });