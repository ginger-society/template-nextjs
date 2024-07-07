import { inputSchema, outputSchema } from '@/server/models'
import { createTRPCRouter, publicProcedure } from '@/server/trpc'

export const exampleRouter = createTRPCRouter({
	hello: publicProcedure
		.input(inputSchema)
		.output(outputSchema)
		.query(async ({ input }) => {
			return {
				greeting: 'Hello there'
			}
		})
})
