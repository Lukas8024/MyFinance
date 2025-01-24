'use client'

import classes from '@/app/error.module.css'

export default function Error() {
	return (
		<main className={classes.error}>
			<h1>An error occurred!</h1>
			<p>Failed to fetch transactions data. Please try again later.</p>
		</main>
	)
}
