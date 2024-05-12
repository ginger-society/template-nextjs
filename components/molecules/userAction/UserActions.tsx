import useAppContext from '@/shared/hooks/useAppContext'
import React from 'react'
import classess from './userAction.module.scss'

const UserActions = (): JSX.Element => {
	const { navigateToSignIn, user } = useAppContext()

	const handleLogout = (): void => {
		if (navigateToSignIn != null) {
			navigateToSignIn()
		}
	}

	const handleLogin = (): void => {
		if (navigateToSignIn != null) {
			navigateToSignIn()
		}
	}

	return (
		<div className={classess.wrapper}>

			<span className="!cursor-pointer">
				{user?.firstName ? <>
					<span>{user?.firstName}</span> <br />
					<a onClick={handleLogout} className={`${classess.logout}`}>
						Logout
					</a>
				</> : <a onClick={handleLogin} className={`${classess.login}`}>
					Login
				</a>}
			</span>
		</div>
	)
}

export default UserActions
