import {PasswordRepository} from "../repositories/password.repo.js";

export class PasswordService {
	constructor(private passwordRepository: PasswordRepository) {
	}
	
	async getUser(userId: string) {
		return await this.passwordRepository.getUser(userId);
	}
}