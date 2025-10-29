import path from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import {fileURLToPath} from 'url'
import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import {FastifyPluginAsync, FastifyServerOptions} from "fastify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {

}

const options: AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (fastify, options): Promise<void> => {
	
	
	fastify.withTypeProvider<TypeBoxTypeProvider>();
	
	
	void fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: options
	});
	
	void fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes/'),
		options: options
	});
	
}

export default app;
export {app, options}