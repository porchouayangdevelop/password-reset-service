import {FastifyPluginAsync} from 'fastify';
import {PasswordRepository} from "../repositories/password.repo.js";
import {PasswordService} from "../services/password.service.js";


const serviceInjectorPlugin: FastifyPluginAsync = async (fastify, opts) => {
	if (!fastify.mysql) {
		throw new Error("MySQL plugin is not registered");
	}
	
	const passwordRepository = new PasswordRepository(fastify.mysql);
	fastify.decorate('passwordRepository', passwordRepository);
	
	const passwordService = new PasswordService(passwordRepository);
	fastify.decorate('passwordService', passwordService);
	
}
export default serviceInjectorPlugin;