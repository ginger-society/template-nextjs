import Header from '@/components/molecules/header'
// import Navigator from '@/components/molecules/navigator'
import Context from '@/shared/appContext'
import { PUBLIC_ROUTES, ROUTES } from '@/shared/constants'
import apiClient from '@/shared/http-client'
import { trpc } from '@/shared/trpc-client'
import { IAgent } from '@/shared/types'
import '@/styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

// import { menuItems } from '@/components/molecules/navigator/navigator.constants'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()
	const [user, setUser] = useState<IAgent | undefined>()
	const [loading, setLoading] = useState<boolean>(true)

	const fetchUser = async (): Promise<void> => {
		try {
			const data = (await apiClient.getCurrentSession()) as IAgent
			setUser(data)
			setLoading(false)
		} catch (error) {
			setUser(undefined)
			setLoading(false)
			if (!PUBLIC_ROUTES.includes(router.pathname)) {
				void router.push(ROUTES.SIGN_IN)
			}
		}
	}

	useEffect(() => {
		void fetchUser()
	}, [])

	const state = {
		setMessage: (args: any) => {
			// console.log('args', args)
		},
		navigateToSignIn: async () => {
			await apiClient.logout()
			void router.push(ROUTES.SIGN_IN)
			setUser(undefined)
		},
		user,
		loading,
		fetchUser
	}
	if (router.asPath === '/docs') {
		return (
			<>
				<Context.Provider value={state}>
					<Head>
						<title>API Docs</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Header />
					<Component {...pageProps} />
				</Context.Provider>
			</>
		)
	} else if (router.asPath === ROUTES.SIGN_IN) {
		return (
			<>
				<Head>
					<title>Login Page</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Context.Provider value={state}>
					<Component {...pageProps} />
				</Context.Provider>
			</>
		)
	} else {
		return (
			<>
				{loading && (
					<>
						<Head key={'loading-head'}>
							<title>Loading...</title>
							<link rel="icon" href="/favicon.ico" />
						</Head>
						<span>Loading....</span>
					</>
				)}
				{!loading && (
					<Context.Provider value={state}>
						<Head>
							<title>App home</title>
							<link rel="icon" href="/favicon.ico" />
						</Head>
						<Header />
						{/* {!user?.firstName ? <Navigator menuItems={menuItems} className="ml-[35rem]" /> : null} */}
						{/* </Header> */}
						<div>
							<Component {...pageProps} />
						</div>
					</Context.Provider>
				)}
			</>
		)
	}
}

export default trpc.withTRPC(MyApp)
