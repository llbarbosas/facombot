type FindRoleFn = (value: Role, key: string) => boolean;

export interface Role {
  id: string;
  hexColor: string;
  name: string;
  toString(): string;
}

export interface Member {
  id: string;
  toString(): string;
}

export interface Message {
  getAuthorMember(): Member | null;
  sendChannelMessage(message: string): Promise<void>;
  findAuthorRole(fn: FindRoleFn): Promise<Role | undefined>;
  findGuildRole(fn: FindRoleFn): Promise<Role | undefined>;
  getGuildRoles(): Promise<Role[]>;
  addAuthorRole(...roles: Role[]): any;
  removeAuthorRole(...roles: Role[]): any;
}
