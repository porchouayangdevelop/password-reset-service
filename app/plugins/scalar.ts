import fp from 'fastify-plugin';
import scalar from '@scalar/fastify-api-reference';
import {FastifyInstance, FastifyPluginOptions} from "fastify";

export default fp(async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
	fastify.register(scalar, {
		routePrefix: '/api-docs',
		configuration: {
			title: 'API Docs',
			theme: 'bluePlanet'
		}
	});
})