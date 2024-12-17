import { z, ZodSchema } from "zod";


export function validateWithZod<T>(schema: ZodSchema<T>, data: unknown) {
    const result = schema.safeParse(data);
    //case error
    if (!result.success) {
        const errors = result.error?.errors.map((error) => error.message);
        throw new Error(errors.join(", "));
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
    username: z.string().min(1,"โปรดกรอก username"),
    password: z.string().min(1,"โปรดกรอก password"),
  })