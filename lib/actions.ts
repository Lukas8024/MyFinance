'use server'

import { redirect } from 'next/navigation'
// import { revalidatePath } from 'next/cache'
import { saveTransaction } from './transactions'

export async function addDataTransaction(formData: FormData) {
	const title = formData.get('title') as string
	const category = formData.get('category') as string
	const amount = Number(formData.get('amount'))

	if (!title || !category || isNaN(amount) || amount === 0) {
		throw new Error('Niepoprawne dane transakcji')
	}

	await saveTransaction({ title, category, amount })


	// console.log('revalidate before');
	// revalidatePath('/')
	// console.log('revalidate');

	redirect('/')
}
