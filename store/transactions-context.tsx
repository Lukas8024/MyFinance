'use client'

import { createContext, ReactNode, useState, useCallback } from 'react'

type AccountObj = {
	avaiableAccount: (summaryValue: number) => void
	avaiableMoney: number
}

type TransactionProviderProps = {
	children: ReactNode
}

const TransactionContext = createContext<AccountObj>({
	avaiableAccount: () => {},
	avaiableMoney: 0,
})

export function TransactionProvider({ children }: TransactionProviderProps) {
	const [summaryIncoming, setSummaryIncoming] = useState(0)
	const [summaryExpense, setSummaryExpense] = useState(0)
	
	
	const avaiableAccount = useCallback((summaryValue: number) => {
		if (summaryValue > 0) {
			setSummaryIncoming(prev => prev + summaryValue)
		} else {
			setSummaryExpense(prev => prev + Math.abs(summaryValue))
		}
		console.log(`Przychód: ${summaryIncoming}, Wydatki: ${summaryExpense}, Dostępne: ${avaiableMoney}`)
	}, []) // useCallback zabezpiecza przed niepotrzebnym tworzeniem nowej funkcji
	
	const avaiableMoney = summaryIncoming - summaryExpense
	
	// function avaiableAccount(summaryValue: number) {
	// 	if (summaryValue > 0) {
	// 		setSummaryIncoming(prev => prev + summaryValue)
	// 	} else {
	// 		// setSummaryExpense(prev => prev - summaryValue)
	// 		setSummaryExpense(prev => prev + Math.abs(summaryValue))
	// 	}

	// console.log(`Przychód: ${summaryIncoming}, Wydatki: ${summaryExpense}, Dostępne: ${avaiableMoney}`)
		
	// }
	
	
	const TransactionContextValue = {
		avaiableAccount,
		avaiableMoney,
	}

	return <TransactionContext.Provider value={TransactionContextValue}>{children}</TransactionContext.Provider>
}

export default TransactionContext
