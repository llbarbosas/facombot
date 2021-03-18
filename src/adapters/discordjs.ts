import { Message, Role } from "discord.js";
import { Message as DomainMessage } from "@core/discord";

// TODO: Lidar com null/undefined nas chamadas
// TODO: Melhorar conversões de tipo
export const discordjsMessageAdapter = (message: Message): DomainMessage => ({
  getAuthorMember: () => message.member,
  sendChannelMessage: async (text: string) => {
    message.channel.send(text);
  },
  findAuthorRole: async (fn) => message.member?.roles.cache.find(fn) as Role,
  findGuildRole: async (fn) => message.guild?.roles.cache.find(fn),
  addAuthorRole: (...roles: Role[]) =>
    message.guild?.member(message.author)?.roles.add(roles),
  removeAuthorRole: (...roles: Role[]) => message.member?.roles.remove(roles),
  getGuildRoles: async () =>
    (message.guild?.roles.cache.array() as Role[]) || [],
});

export const mockDiscordjsMessage = (): DomainMessage => ({
  getAuthorMember: () => console.log("getting member"),
  sendChannelMessage: async (text: string) => console.log("sending: ", text),
  findAuthorRole: async () => ({ id: "", name: "", hexColor: "" }),
  findGuildRole: async () => ({ id: "", name: "", hexColor: "" }),
  addAuthorRole: async () => console.log("adding author role"),
  getGuildRoles: async () => [{ id: "", name: "", hexColor: "" }],
  removeAuthorRole: async () => console.log(""),
});
