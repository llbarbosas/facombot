import { Message } from "discord.js";
import { commandPrefix, moderationRoleId } from "@config/discord";
import { CommandExecute, getAvailableCommands } from "@core/command";
import { Either, isLeft, map, mapLeft, valueOf } from "@core/either";
import { BotError, isBotError, UserError } from "@core/errors";
import { getRandomPhrase } from "@core/locales";
import { discordjsMessageAdapter } from "@adapters/discordjs";

import { joinClass } from "./classes/joinClass";
import { getClasses } from "./classes/getClasses";
import { getTechnologies } from "./technologies/getTechnologies";
import { manageTechnologies } from "./technologies/manageTechnologies";
import { showHelp } from "./showHelp";

export const avalilableCommands = getAvailableCommands(
  joinClass,
  getClasses,
  getTechnologies,
  manageTechnologies
);

export function onMessage(message: Message) {
  if (message.author.bot) return;
  if (!message.guild) {
    onDM(message);
    return;
  }

  const { content } = message;
  const prefix = commandPrefix;

  if (!content.startsWith(prefix)) return;

  onCommand(message);
}

function onDM(message: Message) {
  message.reply(getRandomPhrase("dmBot"));
}

export async function onCommand(message: Message) {
  const commandBody = message.content.slice(commandPrefix.length);
  const args = commandBody.split(" ");
  const commandName = (args.shift() || "").toLowerCase();
  const command = avalilableCommands[commandName];

  const logOnSuccess = map((r: string) => `[bot] ${command.name}: ${r}`);
  const logOnError = mapLeft(
    (l: Error) => `[bot] Erro no comando ${command.name}: ${l.message}`
  );
  const logCommand = async (result: Either<BotError | UserError, string>) =>
    console.info(valueOf(logOnSuccess(logOnError(await result))));

  const domainMessage = discordjsMessageAdapter(message);

  if (!command) {
    message.channel.send(getRandomPhrase("unknownCommand"));
    logCommand(await showHelp.execute(args, domainMessage));
    return;
  }

  const moderationRole = message.guild?.roles.resolve(moderationRoleId);

  const result = await command.execute(args, domainMessage);

  logCommand(result);

  if (isLeft(result)) {
    message.channel.send(
      isBotError(result)
        ? `Preciso de ajuda, ${moderationRole}: ${result.message}`
        : result.left.message
    );
  }
}
