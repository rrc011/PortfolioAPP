export class User {
	id: string;
	name: string;
	lastName: string;
	email: string;
	password?: string;
	roles: string[];
	isDelete: boolean;
}
