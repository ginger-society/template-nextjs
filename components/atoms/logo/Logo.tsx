import Image from 'next/image'
import React from 'react'

const Logo = (): JSX.Element => {
	return <Image src="/logo.png" alt="App logo" fill={true} />
}
export default Logo
