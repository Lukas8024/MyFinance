import { Suspense } from 'react'
import Image from 'next/image'

import classes from './page.module.css'
import mainLogo from '../public/LogoMyFinance.png'

import { getTransactions } from '@/lib/transactions'
// import { DUMMY_EXPENSES, DUMMY_INCOMING } from '@/initdb'

import { TransactionProvider } from '@/store/transactions-context'

import Transactions from '@/components/transactions/transactions'
import { AvaiableMoney } from '@/components/transactions/transactionCounter'

type transaction = {
	id: number
	category: string
	title: string
	amount: number
}

async function TransactionsList() {
	const datatransactions = (await getTransactions()) as transaction[]

	const expenses = datatransactions.filter(tx => tx.amount < 0)
	// const income = datatransactions.filter(tx => tx.amount >= 0)

	console.log('Expenses:', expenses)
	// console.log('Income:', income)

	return <Transactions transactions={expenses} />
}

async function TransactionsListIncome() {
	const datatransactions = (await getTransactions()) as transaction[];

	const income = datatransactions.filter(tx => tx.amount >= 0);

	console.log('Income:', income);

	return <Transactions transactions={income} />;
}

export default function Home() {
	return (
		<TransactionProvider>
			<div className={classes.page}>
				<header className={classes.header}>
					<Image className={classes.mainlogo} src={mainLogo} alt='logo company "My finance' />
					<h1>My Wallet</h1>
					<p>Account for your budget!</p>
				</header>
				<main>
					<section>
						<h2>List of Transactions</h2>
						<div>
							<h3>Expenses:</h3>
							<Suspense fallback={<p className={classes.loading}>Data fetching...</p>}>
								<TransactionsList />
							</Suspense>
							{/* <Transactions transactions={expenses} /> */}
						</div>
						<div>
							<h3>Income:</h3>
							<Suspense fallback={<p className={classes.loading}>Data fetching...</p>}>
								<TransactionsListIncome />
							</Suspense>
							{/* <Transactions transactions={income} /> */}
						</div>
					</section>
					<section>
						<AvaiableMoney />
					</section>
				</main>
			</div>
		</TransactionProvider>
	)
}
