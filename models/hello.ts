interface Task {
	userId: number
	id: number
	title: string
	completed: boolean
}

export interface helloResponseType {
	tasks: Task[]
	status: boolean
}
