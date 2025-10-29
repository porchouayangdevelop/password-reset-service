import {Static, Type} from '@sinclair/typebox';
import {FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify";
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";

const bodySchema = Type.Object({
	userId: Type.String()
});

const successSchema = Type.Object({
	success: Type.Boolean(),
	message: Type.String(),
	code: Type.Number(),
	data: Type.Optional(Type.Any()),
});

const errorSchema = Type.Object({
	success: Type.Boolean(),
	message: Type.String(),
	code: Type.Number(),
	details: Type.Optional(Type.Any()),
});

export type ResetRequestType = Static<typeof bodySchema>;
export type ResetSuccessResponseType = Static<typeof successSchema>;
export type ResetErrorResponseType = Static<typeof errorSchema>;

declare module 'fastify' {
	interface FastifyInstance {
		passwordService: import('../services/password.service.js').PasswordService
	}
}

const passwordRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	
	const t = fastify.withTypeProvider<TypeBoxTypeProvider>();
	
	t.post('/password-reset', {
		schema: {
			tags: ['Reset'],
			description: 'Endpoint to initiate password reset process',
			summary: 'Password Reset Endpoint',
			body: bodySchema,
			response: {
				200: successSchema,
				400: errorSchema
			}
		}
	}, async function (request: FastifyRequest<{
		Body: {
			userId: string
		}
	}>, reply: FastifyReply): Promise<void> {
		const passwordService = fastify.passwordService;
		try {
			console.log(`Initiating password reset for userId: ${request.body.userId}`);
			// Here you would add the logic to handle the password reset process,
			// such as generating a reset token, sending an email, etc.
			
			const user = await passwordService.getUser(request.body.userId);
			if (!user) {
				throw new Error('User not found');
			}
			
			reply.send({
				success: true,
				message: 'Password reset initiated successfully',
				code: 200,
				data: user
			})
		} catch (e: any) {
			console.log(e)
			reply.send({
				success: false,
				message: 'Failed to initiate password reset',
				code: 400,
				details: e.message
			})
		}
	})
	
}

export default passwordRoutes;