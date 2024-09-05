'use server';

import {z} from 'zod';
import {put, del} from "@vercel/blob"
import {prisma} from '@/lib/prisma';
import { revalidatePath } from 'next/cache'
import { getImageById } from '@/lib/data';
import { Calistoga } from "next/font/google";
import { redirect } from 'next/dist/server/api-utils';

// const UploadSchema  = z.object({
//     title: z.string().min(1),
//     image: z
//     .instanceof(File)
//     .refine((file)  => file.size > 0,{massage: "Image is required"})
//     .refine((file)  => file.size === 0 || file.type.startsWith('image/'), {message: "Only images are allowed", 
//     }) 
//     .refine((file)  => file.size < 4000000, {message: "File size should be less than 4MB",
//     }),
// })

// Jawaban Dari Codeium
const UploadSchema  = z.object({
    title: z.string().min(1),
    image: z
    .instanceof(File)
    .refine((file)  => file.size > 0,{message: "Image is required"})
    .refine((file): file is File => file.type.startsWith('image/'), {message: "Only images are allowed"})
    .refine((file)  => file.size < 4000000, {message: "File size should be less than 4MB"}),
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

    try {
        await prisma.upload.create({
            data:{
                title,
                image: url,
            },
        });
    } catch (error) {
        return {message: 'Failed to create data'};
    }

    revalidatePath('/');
    // redirect('/'); 
    // redirect({ destinataion: '/', permanent: false }); cara 1
};

// Update Image
export const updateImage = async (
    id:string,
    prevstate:unknown, 
    formData: FormData
    
    ) => {
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

    try {
        await prisma.upload.create({
            data:{
                title,
                image: url,
            },
        });
    } catch (error) {
        return {message: 'Failed to create data'};
    }

    revalidatePath('/');
    // redirect('/'); 
    // redirect({ destinataion: '/', permanent: false }); cara 1
};

// Delete Image

export const deleteImage = async (id: string) =>  {
    const data = await getImageById(id);
    if(!data) return {message: 'No Data Found'};

    await del(data.image);
    try {
        await prisma.upload.delete({
            where:{id}
        })
    } catch (error) {
        return  {message: 'failed to delete data'}
    }
    revalidatePath('/')
}

