export class SignInRequest {
    
    public username: string;
    public password: string;
    public email: string;
    public info: string;

	constructor(username: string, password: string, email: string, info: string) {
		this.username = username;
		this.password = password;
		this.email = email;
        this.info = info;
	}
}