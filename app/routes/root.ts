import { FastifyPluginAsync } from 'fastify'
import { BadRequestSchema,ResponseSchema } from '../schemas/root.js'


const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get('/', {
		schema:{
			tags: ['Root'],
			description: 'Returns a simple JSON object indicating the root endpoint',
			summary: 'Root Endpoint',
			response: {
				200:ResponseSchema,
				400:BadRequestSchema
			}
		}
	}, async function (request, reply) {
		return {
			success: true,
			message: 'Welcome to the Reset Password API',
			code: 200,
			data: null
		}
	})
}

export default root;
