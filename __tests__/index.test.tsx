// @ts-nocheck
import Home from '@/pages/index'
import { render } from '@testing-library/react'
import * as routerModule from 'next/router'
import React from 'react'

describe('Home', () => {
	const pushMockFn = jest.fn()
	it.only('renders a heading', async () => {
		jest.spyOn(routerModule, 'useRouter').mockImplementation(() => {
			return {
				push: pushMockFn
			}
		})
		render(<Home />)
		expect(pushMockFn).toHaveBeenCalled()
	})
})
