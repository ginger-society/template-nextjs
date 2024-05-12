import { ErrorObject } from 'ajv'
import React, { useEffect, useState } from 'react'

/**
 * Props for the FieldError component.
 * @interface IFieldErrorProps
 * @property {string} fieldKey - The key of the field for which errors are being displayed.
 * @property {Array<ErrorObject<string, Record<string, any>, unknown>> | null | undefined} errors - An array of errors for the specified field.
 */
interface IFieldErrorProps {
	fieldKey: string
	errors:
		| Array<ErrorObject<string, Record<string, any>, unknown>>
		| null
		| undefined
}

/**
 * Component to display errors for a specific form field.
 * @param {IFieldErrorProps} props - The props for the FieldError component.
 * @returns {JSX.Element} - The JSX representation of the component.
 */
const FieldError = ({ fieldKey, errors }: IFieldErrorProps): JSX.Element => {
	const [hasError, setHasError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>()
	/**
	 * useEffect hook to update error state based on changes in the 'errors' or 'fieldKey' props.
	 */
	useEffect(() => {
		if (errors == null) {
			setHasError(false)
		} else {
			const fieldErrors = errors.filter(
				(error) => error.instancePath === fieldKey
			)
			setHasError(fieldErrors.length > 0)
			if (fieldErrors.length > 0) {
				setErrorMessage(fieldErrors[0].message)
			}
		}
	}, [errors, fieldKey])
	/**
	 * Render the component.
	 */
	return (
		<React.Fragment>
			{hasError && <span className="text-red-600">{errorMessage}</span>}
		</React.Fragment>
	)
}

export default FieldError
