import { Command } from '@core/command';
import { right } from '@core/either';
import { avalilableCommands } from './commands';

export const showHelp: Command = {
    name: 'ajuda',
    description: 'Exibe todos os comandos disponíveis',
    async execute(_, message) {
        const helpMessage = Object.entries(avalilableCommands).reduce(
            (text, [commandName, { description, usage }]) =>
                `${text}\`${commandName}\`: ${description}\n${usage ? `\t\t_Exemplo: \`${usage}\`\n_` : ''}`,
            '',
        );

        message.sendChannelMessage(helpMessage);

        const member = message.getAuthorMember();
        return right(`Exibindo ajuda para ${member}`);
    },
};
