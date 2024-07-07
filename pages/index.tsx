import { ROUTES } from '@/shared/constants'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const Home = (): JSX.Element => {
	const router = useRouter()

	useEffect(() => {
		void router.push(ROUTES.HOME)
	}, [router])

	return <div className="p-[10rem]"></div>
}

export default Home
