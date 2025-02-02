import Image from 'next/image'
import { useState } from 'react'

import { categoryIcons } from '@/assets/categoryIcons'

import { addDataTransaction } from '@/lib/actions'
import classes from '@/components/transactions/transactionForm.module.css'
import TransactionFormSubmit from './transactionFormSubmit'

type TransactionFormProps = {
	onCancel: () => void
	// onSubmit: (transaction: { title: string; category: string; amount: number }) => void
}

export default function TransactionForm({ onCancel }: TransactionFormProps) {
	const categories = ['Food', 'Clothes', 'Coins']
	const [selectedCategory, setSelectedCategory] = useState(categories[0])

	return (
		<form className={classes.form} onClick={e => e.stopPropagation()} action={addDataTransaction}>
			<div className={classes.control}>
				<label htmlFor='title'>Title:</label>
				<input type='text' id='title' name='title' required />
			</div>
			<div className={classes.control}>
				<label htmlFor='category'>Category:</label>
				{categoryIcons[selectedCategory] && (
					<div className={classes.iconPreview}>
						<select id='category' name='category' required onChange={e => setSelectedCategory(e.target.value)}>
							{categories.map(cat => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<Image src={categoryIcons[selectedCategory]} alt={`${selectedCategory} icon`} width={20} height={20} />
					</div>
				)}
			</div>
			<div className={classes.control}>
				<label htmlFor='amount'>Amount:</label>
				<input type='number' id='amount' name='amount' required />
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={onCancel}>
					Cancel
				</button>
				<TransactionFormSubmit />
			</div>
		</form>
	)
}
