import sql from 'better-sqlite3'

const db = sql('transactions.db')

export async function getTransactions() {
	await new Promise(resolve => setTimeout(resolve, 2000))
	// throw new Error('Loading transactions failed!')
	return db.prepare('SELECT * FROM transactions').all()
}
