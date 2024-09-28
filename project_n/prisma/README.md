# __การใช้ Prisma__

---
## ข้อหัว : การทำ Seeding (การ initial value เมื่อมีการสร้างตาราง)

1.เข้าไปในไฟล์ Seed.ts
2.กำหนดข้อมูลที่จะต้องการสร้าง
3.ทำการสร้างคำสั่งในการ insert
จากนั้นทำการ 
```
npx prisma db seed
```
---
## หัวข้อ : การสร้าง database 
1.สร้าง Model ใน file schema.prisma
จากนั้นทำการ
```
npx prisma migrate dev
```
