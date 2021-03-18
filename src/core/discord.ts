type FindRoleFn = (value: Role, key: string) => boolean;

export interface Role {
  id: string;
  hexColor: string;
  name: string;
}

export interface Member {
  id: string;
}

export interface Message {
  getAuthorMember(): any;
  sendChannelMessage(message: string): Promise<void>;
  findAuthorRole(fn: FindRoleFn): Promise<Role>;
  findGuildRole(fn: FindRoleFn): Promise<Role>;
  getGuildRoles(): Promise<Role[]>;
  addAuthorRole(...roles: Role[]): any;
}
