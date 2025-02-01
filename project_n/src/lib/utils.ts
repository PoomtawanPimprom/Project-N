import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 } from "uuid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateKey(){
  return v4()
}

export function convertToThaiTime(createdAt:Date){
  return new Date(createdAt).toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
  })
}

