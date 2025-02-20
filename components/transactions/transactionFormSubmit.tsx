import { useFormStatus } from 'react-dom'

export default function TransactionFormSubmit() {
	
	const { pending } = useFormStatus()
	return (
		<button type='submit' disabled={pending}>
			{pending ? 'Submitting...' : 'Add Transaction'}
		</button>
	)
}
