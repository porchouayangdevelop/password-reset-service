import {FastifyPluginAsync} from 'fastify'
import {BadRequestSchema, ResponseSchema} from '../schemas/root.js'
import {Type} from '@sinclair/typebox'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get('/', {
		schema: {
			tags: ['Root'],
			description: 'Returns a simple JSON object indicating the root endpoint',
			summary: 'Root Endpoint',
			response: {
				200: ResponseSchema,
				400: BadRequestSchema
			}
		}
	}, async function (request, reply) {
		return {
			success: true,
			message: 'Welcome to the Reset Password API',
			code: 200,
			data: null
		}
	});
	
	fastify.get('/health', {
		schema: {
			tags: ['Health'],
			description: 'Health check endpoint to verify the API is running',
			summary: 'Health Check Endpoint',
			response: {
				200: Type.Object({
					success: Type.Boolean(),
					message: Type.String(),
					timestamp: Type.String(),
					result: Type.Optional(Type.Any()),
					database: Type.Object({
						connected: Type.Boolean()
					})
				}),
				400: BadRequestSchema,
			}
		}
	}, async function (request, reply) {
		let isConnected = false;
		try {
			const conn = await fastify.mysql.getConnection();
			const [result] = await conn.query('SELECT 1');
			conn.release();
			isConnected = true;
			
			return {
				success: true,
				message: 'API is healthy',
				timestamp: new Date().toISOString(),
				result:result,
				database: {
					connected: isConnected
				}
			}
		} catch (e: any) {
			fastify.log.error({error: e.message}, 'Health check failed');
			return {
				success: false,
				message: 'API is unhealthy: ' + e.message,
				timestamp: new Date().toISOString(),
				result:null,
				database: {
					connected: isConnected
				}
			}
		}
		
	});
}

export default root;
