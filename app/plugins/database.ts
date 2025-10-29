import fp from 'fastify-plugin';
import mysql, {FastifyMySQLOptions, isMySQLPromisePool, MySQLPromisePool} from '@fastify/mysql';
import {FastifyInstance, FastifyPluginOptions} from "fastify";
import {AppConfig} from "../configs/app.config.js";

export default fp(async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
	const mysqlOptions: FastifyMySQLOptions = {
		promise: true,
		connectionString:
			`mysql://${AppConfig.database.user}:${AppConfig.database.password}@${AppConfig.database.host}:${AppConfig.database.port}/${AppConfig.database.database}`,
		connectionLimit: 5000,
	};
	
	fastify.register(mysql, mysqlOptions).after(async function (err) {
		if (isMySQLPromisePool(fastify.mysql)) {
			const mysql = fastify.mysql;
			const con = await mysql.getConnection();
			con.release();
			
		}
	})
	
	fastify.addHook('onRequest', async () => {
		try {
			const connection = await fastify.mysql.getConnection();
			connection.release();
		} catch (error: any) {
			throw error.message;
		}
	});
	
	
	fastify.addHook('onClose', async (instance)=>{
	
	})
	
});

// if you passed promise = true
declare module 'fastify' {
	interface FastifyInstance {
		mysql: MySQLPromisePool
	}
}
