import apiClient from '@/shared/http-client'
import { trpc } from '@/shared/trpc-client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Home = (): React.ReactNode => {
	const router = useRouter()
	const { data } = trpc.example.hello.useQuery({ text: 'from tRPC' })

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const getData = async () => {
		await apiClient.hello()
	}

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {}, [router])

	return <div className="mt-[80px]">{data?.greeting}</div>
}

export default Home
