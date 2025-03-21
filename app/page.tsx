import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import classes from './page.module.css'

import { getTransactions } from '@/lib/transactions'

import Transactions from '@/components/transactions/transactions'
import { AvaiableMoney } from '@/components/transactions/transactionCounter'
import Footer from '@/components/footer'
import MainHeader from '@/components/main-header/main-header'
import LogoutButton from '@/components/auth/logout-button'

type Transaction = {
	_id: string
	category: string
	title: string
	amount: number
}

type TransactionListProps = {
	type: 'expense' | 'income'
}

export const dynamic = 'force-dynamic'

async function TransactionsList({ type }: TransactionListProps) {
	const datatransactions = (await getTransactions()) as Transaction[]

	const filteredTransaction =
		type === 'expense' ? datatransactions.filter(tx => tx.amount < 0) : datatransactions.filter(tx => tx.amount >= 0)

	return (
		<div>
			<Transactions transactions={filteredTransaction} />
		</div>
	)
}

async function GetTotalAmount() {
	const datatransactions = (await getTransactions()) as Transaction[]

	const avaiableMoney = datatransactions.reduce((sum, tx) => sum + tx.amount, 0)

	// console.log(money)
	return <AvaiableMoney money={avaiableMoney} />
}

export default async function Home() {
	const session = await getServerSession()

	if (!session) {
		redirect('/login')
	}

	return (
		<>
			<div className={classes.page}>
				<header className={classes.header}>
					<MainHeader />
					<div className={classes.headerActions}>
						<LogoutButton />
					</div>
				</header>
				<main>
					<section>
						<GetTotalAmount />
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
			<footer>
				<Footer />
			</footer>
		</>
	)
}
