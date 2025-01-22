'use client'

import TransactionContext from '@/store/transactions-context'
import { useContext, useEffect } from 'react'

import classes from './transactionCounter.module.css'

export function AvaiableMoney() {
	const { avaiableMoney } = useContext(TransactionContext)

	return (
		<>
			<div className={classes.avaiableMoney}>
				<h2>Avaiable Money:</h2>
				<p> $ {avaiableMoney}</p>
			</div>
			<div className={classes.avaiableAction}>
				<button>Add Transaction</button>
			</div>
		</>
	)
}

export function TransactionsClientLogic({ summaryValue }: { summaryValue: number }) {
	const { avaiableAccount } = useContext(TransactionContext)

	useEffect(() => {
		avaiableAccount(summaryValue)
	}, [summaryValue])

	return null
}
