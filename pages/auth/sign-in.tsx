import FieldError from '@/components/atoms/fieldError'
import { ROUTES } from '@/shared/constants'
import useAppContext from '@/shared/hooks/useAppContext'
import apiClient from '@/shared/http-client'
import validator from '@/shared/validators/auth-form'
import { ErrorObject } from 'ajv'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface ErrorT extends ErrorObject<string, Record<string, any>, unknown> {}

export const SignIn = (): React.ReactNode => {
	const router = useRouter()
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [errors, setErrors] = useState<ErrorT[] | null | undefined>()
	const [serversideError, setServerSideError] = useState<string | null>(null)

	const { loading, user, fetchUser } = useAppContext()

	useEffect(() => {
		if (!loading && user != null) {
			void router.push(ROUTES.HOME)
		}
	}, [loading, user, router])
	const onUsernameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
		setUsername(evt.target.value)
	}
	const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>): void => {
		setPassword(evt.target.value)
	}

	const resetErrors = (): void => {
		setErrors(null)
		setServerSideError(null)
	}

	const handleSubmit = async (): Promise<void> => {
		const payload = { username, password }
		resetErrors()
		if (!validator(payload)) {
			setErrors(validator.errors)
			return
		}

		try {
			const data = await apiClient.signIn({ signInRequest: payload })
			if (data.isValid) {
				router.push(ROUTES.HOME)
				if (fetchUser !== undefined) fetchUser()
			} else {
				setServerSideError('Invalid user credentials')
			}
		} catch (e) {
			setServerSideError('Error')
		}
	}

	const handleKeyUp = ({
		code
	}: React.KeyboardEvent<HTMLInputElement>): void => {
		if (code === 'Enter') {
			void handleSubmit()
		}
	}

	return (
		<div className="flex loginBg">
			<div className="w-1/2 p-[10rem]  mt-10 ">
				<div className="flex-col flex">
					<h1 className="mt-3 ">Sign in with username and password</h1>

					<input
						required
						onChange={onUsernameChange}
						className={'!mt-10 input'}
						placeholder="Username"
					/>

					<FieldError errors={errors} fieldKey="/username" />

					<input
						required
						onKeyUp={handleKeyUp}
						onChange={onPasswordChange}
						className={'!mt-5 input'}
						placeholder="Password"
						type="password"
					/>

					<FieldError errors={errors} fieldKey="/password" />

					<div className="mt-10">
						{serversideError !== null && (
							<span className={'errorLabel'}>{serversideError}</span>
						)}
					</div>

					<button
						onClick={handleSubmit}
						className={
							"mt-10 'button' text-white bg-amber-600  border-0 p-2 rounded-xl"
						}
					>
						Submit
					</button>
				</div>
			</div>
			<div className="loginImage h-full w-1/2"></div>
		</div>
	)
}

export default SignIn
