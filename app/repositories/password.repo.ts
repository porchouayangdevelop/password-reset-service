
import  { MySQLPromisePool} from '@fastify/mysql'



export class PasswordRepository {
	constructor(private db:MySQLPromisePool) {
	}
	
	async getUser(userId:string):Promise<any>{
		let conn = await this.db.getConnection();
		console.log(`Fetching user with ID: ${userId}`);
		try {
			const [rows] = await conn.query('SELECT * FROM bpttlt WHERE tlr = ?', [userId]);
			return rows;
		} finally {
			conn.release();
		}
	}
	
}