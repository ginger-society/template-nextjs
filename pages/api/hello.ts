import { helloResponseType } from 'models/hello'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ServiceOne } from 'services'

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world response
 *     operationId: hello
 *     responses:
 *       200:
 *         description: hello world
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/helloResponseType'
 */
const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<helloResponseType>
) => {
	// const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
	// const data = await response.json()

	const d = await ServiceOne.healthGetDataApiV1HealthGet()
	// eslint-disable-next-line no-console
	console.log(d.status)

	res.json({ tasks: [] })
}

export default handler
