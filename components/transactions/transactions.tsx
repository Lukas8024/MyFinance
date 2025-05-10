import TransactionItem from './transactionItem'

import classes from './transactions.module.css'

export type Transaction = {
	_id: string
	category: string
	title: string
	amount: number
}

type TransactionsProps = {
	transactions: Transaction[]
}

export default function Transactions({ transactions }: TransactionsProps) {
	const summaryValue = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
	// console.log(summaryValue);

	return (
		<div className={classes.transactions}>
			<div className={classes.headers}>
				<div className={classes.details}>
					<span>Category</span>
					<span>Title</span>
					<span>Amount</span>
					<span>Action</span>
				</div>
			</div>
			<ul className={classes.transactionList}>
				{transactions.map(transaction => (
					<li key={transaction._id}>
						<TransactionItem {...transaction} />
					</li>
				))}
				<p className={classes.summary}>Summary: $ {summaryValue}</p>
			</ul>
		</div>
	)
}
