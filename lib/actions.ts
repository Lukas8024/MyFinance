'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { saveTransaction } from './transactions'

export async function addDataTransaction(formData: FormData) {
	const transaction = {
		title: formData.get('title') as string,
		category: formData.get('category') as string,
		amount: Number(formData.get('amount')),
	}


	await saveTransaction(transaction)
    revalidatePath('/')
    redirect('/')
}
