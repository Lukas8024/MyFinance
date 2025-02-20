import { getDb } from '@/lib/mongodb'

export async function saveTransaction(transaction: { title: string; category: string; amount: number }) {
	const categoryLower = transaction.category.toLowerCase()

		const fileName = `${categoryLower}_Icon.svg`
		transaction.category = `/images/${fileName}`

	try {
		const db = await getDb()
		const collection = db.collection('transactions') // Nazwa kolekcji w bazie

		const result = await collection.insertOne(transaction)
		return result
	} catch (error) {
		console.error('Błąd zapisu do MongoDB:', error)
		throw new Error('Nie udało się zapisać transakcji')
	}
}

export async function getTransactions() {
	const db = await getDb()
	const collection = db.collection('transactions')

	const transactions = await collection.find().toArray()

	return transactions.map(tx => ({
		_id: tx._id.toString(),
		category: tx.category,
		title: tx.title,
		amount: tx.amount,
	}))
}
