import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import classes from '@/components/ui/modal.module.css'

type ModalProps = {
	children: ReactNode
	onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
	const modalRoot = document.getElementById('modal-root')
	if (!modalRoot) return null

	return createPortal(
		<>
			<div className={classes.overlay} onClick={onClose}>
				<dialog className={classes.modal} open>
					{children}
					{/* <button className={classes.closeButton} onClick={onClose}>Close Modal</button> */}
				</dialog>,
			</div>
		</>,
		modalRoot
	)
}
