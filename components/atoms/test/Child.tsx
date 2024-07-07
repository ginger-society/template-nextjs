interface IProps {
	title: string
}

const Child = (props: IProps): JSX.Element => {
	return <span>{props.title}</span>
}

export default Child
