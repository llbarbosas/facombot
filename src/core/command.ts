import { Either } from '@core/either';
import { Message } from '@core/discord';
import { BotError, UserError } from './errors';

export interface CommandExecute {
    (args: string[], message: Message): Promise<Either<BotError | UserError, string>>;
}

export interface Command {
    name: string;
    execute: CommandExecute;
    description: string;
    usage?: string;
    flags?: CommandFlags;
}

type CommandFlags = {
    name: string;
    example?: string;
    description: string;
}[];

export type AvailableCommands = {
    [commandAlias: string]: Command;
};

export const getAvailableCommands = (...commands: Command[]): AvailableCommands =>
    commands.reduce((obj, command) => ({ ...obj, [command.name]: command }), {});
