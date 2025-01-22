import sql from 'better-sqlite3'

const db = sql('transactions.db')

export async function getTransactions() {
	await new Promise(resolve => setTimeout(resolve, 5000))
	return db.prepare('SELECT * FROM transactions').all()
}
