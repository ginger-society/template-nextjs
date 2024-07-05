/* tslint:disable */

/* eslint-disable */
import { DefaultApi } from './apis'
import { Configuration } from './runtime'

export * from './runtime'
export * from './apis/index'
export * from './models/index'

const configuration = new Configuration({
	basePath: 'http://localhost:3000'
})
const client = new DefaultApi(configuration)
export default client
