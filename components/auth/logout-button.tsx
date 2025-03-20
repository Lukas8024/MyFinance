'use client'

import { signOut } from 'next-auth/react'
import classes from './logout-button.module.css'

export default function LogoutButton() {
  return (
    <button 
      className={classes.button}
      onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
    >
      Logout
    </button>
  )
}