import NavItem from '@/components/atoms/navItem'
import React from 'react'
import clssess from './navigator.module.scss'
import useAppContext from '@/shared/hooks/useAppContext'

interface INavigatorProps {
	className?: string
	menuItems: any[]
}

const Navigator = ({ className = '', menuItems }: INavigatorProps): JSX.Element => {
	const { user } = useAppContext()

	return (
		<ul className={`flex flex-row ${className} ${clssess.wrapper}`}>
			{!user?.isActive && menuItems.map((menuItem, index) => {
				return <NavItem key={index} {...menuItem} />
			})}
		</ul>
	)
}

export default Navigator
