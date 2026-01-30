export class User {
  id?: number;
  username: string;
  email?: string;
  // Add other fields as needed

  constructor(username: string, email?: string, id?: number) {
    this.username = username;
    this.email = email;
    this.id = id;
  }
}