'use client'

import TransactionContext from '@/store/transactions-context'
import { useContext, useEffect, useState } from 'react'

import classes from './transactionCounter.module.css'
import Modal from '../ui/modal'
import TransactionForm from './transactionForm'

export function AvaiableMoney() {
	const { avaiableMoney } = useContext(TransactionContext)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModalHandler = () => setIsModalOpen(true)
	const closeModalHandler = () => setIsModalOpen(false)

	return (
		<>
			<div className={classes.avaiableMoney}>
				<h2>Avaiable Money:</h2>
				<p> $ {avaiableMoney}</p>
			</div>
			<div className={classes.avaiableAction}>
				<button onClick={openModalHandler}>Add Transaction</button>
			</div>
			{isModalOpen && (
				<Modal onClose={closeModalHandler}>
					<TransactionForm onCancel={closeModalHandler} />
				</Modal>
			)}
		</>
	)
}

export function TransactionsClientLogic({ summaryValue }: { summaryValue: number }) {
	const { avaiableAccount } = useContext(TransactionContext)

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		avaiableAccount(summaryValue), 10000
	// 	})
	// }, [summaryValue, avaiableAccount])

	useEffect(() => {
		setTimeout(() => {
			avaiableAccount(summaryValue)
		}, 3000)
	}, [summaryValue, avaiableAccount])

console.log(avaiableAccount);
console.log(summaryValue);

	return null
}

// export function TransactionsClientLogic({ summaryValue }: { summaryValue: number }) {
// 	const { avaiableAccount } = useContext(TransactionContext)
// 	const [prevValue, setPrevValue] = useState<number | null>(null)

// 	useEffect(() => {
// 		if (summaryValue !== prevValue) {
// 			avaiableAccount(summaryValue)
// 			setPrevValue(summaryValue) // Zapamiętaj ostatnią wartość
// 		}
// 	}, [summaryValue, avaiableAccount, prevValue])

// 	return null
// }
