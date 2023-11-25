// user.d.ts
export type userType = {
	username: string;
	id: number;
	userAccount: string;
	avatarUrl?: string;
	profile?: string;
	gender: number;
	userPassword: string;
	phone: string;
	email: string;
	userStatus: number;
	createTime: Date;
	userRole: number;
	planetCode: string;
	tags: string[];
};
