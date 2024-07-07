// @ts-nocheck
import MyApp from '@/pages/_app'
import SignIn from '@/pages/auth/sign-in'
import Home from '@/pages/home'
import * as useAppContextModule from '@/shared/hooks/useAppContext'
import { resolveTRPCPath } from '@/shared/trpc-client'
import mockRouter from 'next-router-mock'
import React, { act } from 'react'
import setupMockResponses from './utils/setup'

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('@/shared/hooks/useAppContext', () => {
	return {
		__esModule: true,
		...jest.requireActual('@/shared/hooks/useAppContext')
	}
})

describe('_app', () => {
	it('renders a home page', async () => {
		const mocks = {
			[resolveTRPCPath('example.hello')]: { greeting: 'Hello from tRPC' }
		}

		setupMockResponses(mocks)
		void mockRouter.push('/home')

		await act(async () => {
			render(<MyApp Component={Home} />)
		})
		await waitFor(() => {
			expect(screen.getByText('Hello from tRPC')).toBeInTheDocument()
		})
	})

	it('renders the login page', async () => {
		void mockRouter.push('/auth/sign-in')

		jest.spyOn(useAppContextModule, 'default').mockImplementation(() => {
			return { loading: false, user: null, fetchUser: jest.fn() }
		})

		await act(async () => {
			render(<MyApp Component={SignIn} />)
		})
		await waitFor(() => {
			expect(
				screen.getByText('Sign in with username and password')
			).toBeInTheDocument()
		})
	})
})
