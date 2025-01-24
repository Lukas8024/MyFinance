import TransactionItem from './transactionItem'
import { TransactionsClientLogic } from '@/components/transactions/transactionCounter'

import classes from './transactions.module.css'

type Transaction = {
	id: number
	category: string
	title: string
	amount: number
}

type TransactionsProps = {
	transactions: Transaction[]
}

export default function Transactions({ transactions }: TransactionsProps) {

	const summaryValue = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
	console.log(summaryValue);

	return (
		<ul className={classes.transactions}>
			{transactions.map(transaction => (
				<li key={transaction.id}>
					<TransactionItem {...transaction} />
				</li>
			))}
			<p className={classes.summary}>Summary: $ {summaryValue}</p>
			<TransactionsClientLogic summaryValue={summaryValue} />
		</ul>
	)
}
