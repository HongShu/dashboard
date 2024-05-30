'use server'
import React from 'react'
// 1. 导入zod库
import { z } from 'zod'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// 2. 定义一个表单验证的对象
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    date: z.string(),
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: z.enum(['pending', 'paid'])
})
//3. 定义校验形式
const CreateInvoice = FormSchema.omit({ id: true, date: true })

export async function createInvoice(formData: FormData) {
    // rawFormData存放表单提交的数据
    const rawFormData = Object.fromEntries(formData.entries())
    // rawFormData.amount = "a"
    //4. 使用定义的校验规则，对提交过来的数据进行教研
    const { customerId, amount, status } = CreateInvoice.parse(rawFormData)
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}
