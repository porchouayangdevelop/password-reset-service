import fp from 'fastify-plugin';

export interface SupportPluginOptions {

}

export default fp<SupportPluginOptions>(async (fastify, options) => {
	fastify.decorate('support', function () {
		return 'Support plugin is working!';
	});
});


declare module 'fastify' {
	export interface FastifyInstance {
		support(): string;
	}
}