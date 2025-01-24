import { useState } from 'react'

import classes from '@/components/transactions/transactionForm.module.css'

type TransactionFormProps = {
	onCancel: () => void
	onSubmit: (transaction: { title: string; category: string; amount: number }) => void
}

export default function TransactionForm({ onCancel, onSubmit }: TransactionFormProps) {
	const [title, setTitle] = useState('')
	const [category, setCategory] = useState('')
	const [amount, setAmount] = useState('')

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit({
			title,
			category,
			amount: parseFloat(amount),
		})
		onCancel()
	}

	return (
		<form className={classes.form} onSubmit={submitHandler} onClick={e => e.stopPropagation()}>
			<div className={classes.control}>
				<label htmlFor='title'>Title:</label>
				<input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} required />
			</div>
			<div className={classes.control}>
				<label htmlFor='category'>Category:</label>
				<input type='text' id='category' value={category} onChange={e => setCategory(e.target.value)} required />
			</div>
			<div className={classes.control}>
				<label htmlFor='amount'>Amount:</label>
				<input type='number' id='amount' value={amount} onChange={e => setAmount(e.target.value)} required />
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={onCancel}>
					Cancel
				</button>
				<button type='submit'>Add Transaction</button>
			</div>
		</form>
	)
}
