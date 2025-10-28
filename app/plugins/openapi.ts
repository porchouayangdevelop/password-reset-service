import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import {FastifyInstance, FastifyPluginOptions} from "fastify";

export default fp(async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
	
	fastify.register(swagger, {
		openapi: {
			info: {
				title: "Reset password API",
				description: "This is a sample API for reset password service.",
				termsOfService: "http://example.com/terms/",
				contact: {
					name: "Support",
					url: "http://www.example.com/support",
					email: "support@example.com",
				},
				license: {
					name: "Apache 2.0",
					url: "https://www.apache.org/licenses/LICENSE-2.0.html",
				},
				version: "1.0.1",
			},
		},
	})
})