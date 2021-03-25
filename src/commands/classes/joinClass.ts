import { Command } from '@core/command';
import { left, map, right, valueOf } from '@core/either';
import { UserError } from '@core/errors';
import { getRandomPhrase } from '@core/locales';
import { filterClassRoles } from '@core/util';
import { showHelp } from 'commands/showHelp';

export const joinClass: Command = {
    name: 'turma',
    description: `Inscreve o aluno numa turma. Use "!turmas" para listar as turmas disponíveis`,
    flags: [
        {
            name: 'entrar',
            description: 'Adiciona usuário de uma turma',
            example: 'entrar engsoft19',
        },
    ],
    async execute(args, message) {
        const [action, desiredClassRoleName, ...otherClasses] = args;

        if (action !== 'action' || otherClasses.length > 0) {
            const helpResult = await showHelp.execute(args, message);
            const helpAsLeft = map((result: string) => UserError(result))(helpResult);
            return left(valueOf(helpAsLeft));
        }

        const guildRoles = await message.getGuildRoles();
        const courseClasses = filterClassRoles(guildRoles);

        const desiredClassRole = courseClasses.find((role) => role.name === desiredClassRoleName);

        if (!desiredClassRole) {
            return left(
                UserError(
                    `${getRandomPhrase('unknownClass', {
                        className: desiredClassRoleName,
                    })} ${getRandomPhrase('allClasses')}`,
                ),
            );
        }

        const member = message.getAuthorMember();

        const userCurrentClassRole = await message.findAuthorRole((role) =>
            courseClasses.some((classRole) => classRole.name === role.name),
        );

        if (userCurrentClassRole) {
            const moderationRole = guildRoles.find((r) => r.name == 'moderador(a)');

            return left(
                UserError(
                    `${getRandomPhrase('stopAction', {
                        member: member?.toString(),
                    })} Você já está matriculado na turma ${`\`${userCurrentClassRole.name}\``}. ${getRandomPhrase(
                        'callModeration',
                        {
                            moderationRole: moderationRole?.toString(),
                        },
                    )}`,
                ),
            );
        }

        await message.addAuthorRole(desiredClassRole);
        await message.sendChannelMessage(
            getRandomPhrase('welcomeClass', {
                member: member?.toString(),
                classRole: desiredClassRole.toString(),
            }),
        );

        return right(`${member} foi adicionado à turma ${desiredClassRole}`);
    },
};
