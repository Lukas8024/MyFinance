const sql = require('better-sqlite3')
const db = sql('transactions.db')

const transactions = [
	{ id: 1, category: '/images/food_Icon.svg', title: 'meal', amount: -34 },
	{ id: 2, category: '/images/clothes_Icon.svg', title: 't-shirt', amount: -150 },
	{ id: 3, category: '/images/clothes_Icon.svg', title: 'shoes', amount: -200 },
	{ id: 4, category: '/images/coins_Icon.svg', title: 'Lotto', amount: 6500 },
	{ id: 5, category: '/images/coins_Icon.svg', title: 'Payment', amount: 7000 },
]

db.prepare(
	`
	CREATE TABLE IF NOT EXISTS transactions(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	category TEXT NOT NULL,
	title TEXT NOT NULL,
	amount REAL NOT NULL
	)
	`
).run()

async function initData() {
	const stmt = db.prepare(`
		INSERT INTO transactions VALUES (
		   null,
		   @category,
		   @title,
		   @amount
		)
	 `)

	for (const transaction of transactions) {
		stmt.run(transaction)
	}
}

initData()
