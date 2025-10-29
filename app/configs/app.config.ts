import {config} from 'dotenv';

const env = process.env.NODE_ENV === 'production' ? '.env.prd' : '.env.dev';

const result = config({path: env});

if (result.error) {
	throw result.error;
}


interface DatabaseConfigOptions {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
}

export interface AppConfigOptions {
	server: {
		host: string;
		port: number;
		logger: any
	},
	database: DatabaseConfigOptions
}

export const AppConfig: AppConfigOptions = {
	server: {
		host: process.env.HOST as string,
		port: Number(process.env.PORT) as number,
		logger: process.env.NODE_ENV === 'production' ? true : {
			transport: {
				target: '@fastify/one-line-logger',
			}
		}
	},
	database: {
		host: process.env.DB_HOST as string,
		port: Number(process.env.DB_PORT) as number,
		user: process.env.DB_USER as string,
		password: process.env.DB_PASSWORD as string,
		database: process.env.DB_NAME as string,
	}
}