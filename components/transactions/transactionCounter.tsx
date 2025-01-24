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

	const addTransactionHandler = (transaction: { category: string; title: string; amount: number }) => {
		// Logic saved database
		console.log('Dodano transakcję:', transaction)
	}

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
					<TransactionForm onCancel={closeModalHandler} onSubmit={addTransactionHandler} />
				</Modal>
			)}
			;
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
