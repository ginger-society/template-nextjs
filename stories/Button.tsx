import React from 'react'
import './button.css'

/**
 * @typedef {Object} ButtonProps
 * @property {boolean} [primary] - Is this the principal call to action on the page?
 * @property {string} [backgroundColor] - What background color to use
 * @property {'small' | 'medium' | 'large'} [size] - How large should the button be?
 * @property {string} [label] - Button contents
 * @property {?function} [onClick] - Optional click handler
 */
interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean
	/**
	 * What background color to use
	 */
	backgroundColor?: string
	/**
	 * How large should the button be?
	 */
	size?: 'small' | 'medium' | 'large'
	/**
	 * Button contents
	 */
	label: string
	/**
	 * Optional click handler
	 */
	onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
	primary = false,
	size = 'medium',
	backgroundColor,
	label,
	...props
}: ButtonProps): JSX.Element => {
	let btnStyle = {}
	if (backgroundColor != null && backgroundColor.length > 0) {
		btnStyle = { 'background-color': backgroundColor }
	}
	const mode = primary
		? 'storybook-button--primary'
		: 'storybook-button--secondary'
	return (
		<button
			style={{ ...btnStyle }}
			type="button"
			className={['storybook-button', `storybook-button--${size}`, mode].join(
				' '
			)}
			{...props}
		>
			{label}
		</button>
	)
}
