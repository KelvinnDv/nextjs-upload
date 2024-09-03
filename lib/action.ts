'use server';
import {z} from 'zod';
import {put} from "@vercel/blob"
import {prisma} from '@/lib/prisma';
import { revalidatePath } from 'next/cache'
import { Calistoga } from "next/font/google";
import { redirect } from 'next/dist/server/api-utils';

const UploadSchema  = z.object({
    title: z.string().min(1),
    image: z
    .instanceof(File)
    .refine((file)  => file.size > 0,{massage: "Image is required"})
    .refine((file)  => file.size === 0 || file.type.startsWith('image/'), {message: "Only images are allowed", 
    }) 
    .refine((file)  => file.size < 4000000, {message: "File size should be less than 4MB",
    }),
})


export const uploadImage = async (prevstate:unknown, formData: FormData) => {
    const validatetedFields = UploadSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if(!validatetedFields.success) {
        return {
            error: validatetedFields.error.flatten().fieldErrors
        };
    }

    const {title, image} = validatetedFields.data;
    const {url} = await put(image.name, image,{
        access: "public",
        multipart: true
    });

    try{
        await prisma.upload.create({
            data:{
                title,
                image: url
            },
        });
    } catch (error) {
        return {message: 'Failed to create data'};
    }

    revalidatePath('/');
    redirect('/');
}