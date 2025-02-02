import { Suspense } from 'react'
import Image from 'next/image'

import classes from './page.module.css'
import mainLogo from '../public/LogoMyFinance.png'

import { getTransactions } from '@/lib/transactions'
// import { DUMMY_EXPENSES, DUMMY_INCOMING } from '@/initdb'

import Transactions from '@/components/transactions/transactions'
import { AvaiableMoney } from '@/components/transactions/transactionCounter'

type Transaction = {
	id: number
	category: string
	title: string
	amount: number
}

type TransactionListProps = {
	type: 'expense' | 'income'
}

async function TransactionsList({ type }: TransactionListProps) {
	const datatransactions = (await getTransactions()) as Transaction[]

	const filteredTransaction =
		type === 'expense' ? datatransactions.filter(tx => tx.amount < 0) : datatransactions.filter(tx => tx.amount >= 0)

	return <Transactions transactions={filteredTransaction} />
}

export default function Home() {
	return (
		<div className={classes.page}>
			<header className={classes.header}>
				<Image className={classes.mainlogo} src={mainLogo} alt='logo company "My finance' priority />
				<h1>My Wallet</h1>
				<p>Account for your budget!</p>
			</header>
			<main>
				<section>
					<AvaiableMoney />
				</section>
				<section>
					<h2>List of Transactions</h2>
					<div>
						<h3>Expenses:</h3>
						<Suspense fallback={<p className={classes.loading}>Data fetching...</p>}>
							<TransactionsList type='expense' />
						</Suspense>
					</div>
					<div>
						<h3>Income:</h3>
						<Suspense fallback={<p className={classes.loading}>Data fetching...</p>}>
							<TransactionsList type='income' />
						</Suspense>
					</div>
				</section>
			</main>
		</div>
	)
}
