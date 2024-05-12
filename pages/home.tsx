import apiClient from '@/shared/http-client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Home = (): React.ReactNode => {
	const router = useRouter()
	// const { data, isLoading } = trpc.example.hello.useQuery({ text: 'from tRPC' })

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const getData = async () => {
		const data = await apiClient.hello()
		// eslint-disable-next-line no-console
		console.log(data.tasks)
	}

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {}, [router])

	return <div className="mt-[80px]"></div>
}

export default Home
