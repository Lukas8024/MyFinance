'use client'

import { useState } from 'react'

import classes from './transactionCounter.module.css'
import Modal from '../ui/modal'
import TransactionForm from './transactionForm'

export function AvaiableMoney({ money }: { money: number }) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModalHandler = () => setIsModalOpen(true)
	const closeModalHandler = () => setIsModalOpen(false)

	return (
		<>
			<div className={classes.avaiableMoney}>
				<h2>Avaiable Money: $ {money}</h2>
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