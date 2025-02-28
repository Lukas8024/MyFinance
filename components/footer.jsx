import Image from 'next/image'

import Logo from '../assets/LukasCoding.png'
import classes from './footer.module.css'

export default function Footer() {
	const year = new Date().getFullYear()
	return (
		<footer className={classes.footer}>
			<Image src={Logo} alt='Logo' width={70} height={40} priority />
			<p>
				&copy; <span className='footer-year'>{year}</span> by lukas_8024
			</p>
		</footer>
	)
}
