'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import {notifications} from "@mantine/notifications";

export async function login(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') ,
        password: formData.get('password') ,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.log(error)
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email'),
        password: formData.get('password') ,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }
    notifications.show({
        title: 'Check your email for a confirmation link',
        message: 'Hey there, your code is awesome! 🤥',
    })
    revalidatePath('/', 'layout')
    // redirect('/')
}
