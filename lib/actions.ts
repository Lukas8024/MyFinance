'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { deleteTransactionById } from './transactions'

import { saveTransaction } from './transactions'

export async function addDataTransaction(formData: FormData) {
	const title = formData.get('title') as string
	const category = formData.get('category') as string
	const amount = Number(formData.get('amount'))

	if (!title || !category || isNaN(amount) || amount === 0) {
		throw new Error('Niepoprawne dane transakcji')
	}

	await saveTransaction({ title, category, amount })

	revalidatePath('/')
	redirect('/')
}




export async function deleteTransaction(id: string) {
	if (!id) {
		throw new Error('Brak ID transakcji')
	}

	await deleteTransactionById(id)

	revalidatePath('/')
	redirect('/') 
}
