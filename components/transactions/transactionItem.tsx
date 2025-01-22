import Image from 'next/image'

import classes from './transactionItem.module.css'

type TransactionItemProps = {
	id: number
	category: string
	title: string
	amount: number
}

export default function TransactionItem({ category, title, amount }: TransactionItemProps) {

	return (
        <div className={classes.transactionItem}>
			<div className={classes.details}>
				<Image src={category} alt={title} width={20} height={20} className={classes.image} />
				<p>{title}</p>
			</div>
				<p>$ {amount.toFixed(2)}</p>
		</div>
	)
}
