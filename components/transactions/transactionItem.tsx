'use client'

import Image from 'next/image'
import { useState, useTransition } from 'react'

import TrashIcon from '@/assets/trash_Icon.svg'

import classes from './transactionItem.module.css'

import { deleteTransaction } from '@/lib/actions'

type TransactionItemProps = {
	_id: string
	category: string
	title: string
	amount: number
}

export default function TransactionItem({ _id, category, title, amount }: TransactionItemProps) {
	const [isPending, startTransition] = useTransition()
	const [isConfirming, setIsConfirming] = useState(false)

	const handleDelete = () => {
		if (!window.confirm('Are you sure you want to delete this transaction?')) {
			return
		}

		setIsConfirming(true)

		startTransition(async () => {
			await deleteTransaction(_id)
		})
	}

	return (
		<div className={classes.transactionItem}>
			<div className={classes.details}>
				<Image src={category} alt={title} width={20} height={20} className={classes.image} />
				<p>{title}</p>
			</div>
			<div className={classes.actions}>
				<p>$ {amount.toFixed(2)}</p>
				<button className={classes.delete} onClick={handleDelete} disabled={isPending}>
					{isPending || isConfirming ? 'Delete...' : <Image src={TrashIcon} alt='Trash Icon' width={15} height={15} />}
				</button>
			</div>
		</div>
	)
}
