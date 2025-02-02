import sql from 'better-sqlite3'

type Transaction = {
	category: string
	title: string
	amount: number
}

const db = sql('transactions.db')

export async function getTransactions() {
	// await new Promise(resolve => setTimeout(resolve, 2000))
	// throw new Error('Loading transactions failed!')
	return db.prepare('SELECT * FROM transactions').all()
}

export async function saveTransaction(transaction: Transaction) {
	await new Promise(resolve => setTimeout(resolve, 2000))

	const categoryLower = transaction.category.toLowerCase()

	const fileName = `${categoryLower}_Icon.svg`
	transaction.category = `/images/${fileName}`

	db.prepare(
		`
		INSERT INTO transactions (category, title, amount) VALUES (
		@category,
		@title,
		@amount)
		`
	).run(transaction)
}
