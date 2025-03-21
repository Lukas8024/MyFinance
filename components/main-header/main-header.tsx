import Image from 'next/image'

import mainLogo from '@/public/LogoMyFinance.png'
// import LogoutButton from '@/components/auth/logout-button'

import classes from './main-header.module.css'

export default function MainHeader() {
	return (
			<div className={classes.headerContent}>
				<Image className={classes.mainlogo} src={mainLogo} alt='logo company "My finance' priority />
				<h1>My Wallet</h1>
				<p>Account for your budget!</p>
			</div>
	)
}
