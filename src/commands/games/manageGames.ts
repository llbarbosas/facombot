import { whiteCheckMarkEmoji } from '@config/discord';
import { Command } from '@core/command';
import { Role } from '@core/discord';
import { left, map, right, valueOf } from '@core/either';
import { UserError } from '@core/errors';
import { getRandomPhrase } from '@core/locales';
import { arrayToTextualList, filterGameRoles, randomBetween } from '@core/util';
import { showHelp } from '../showHelp';

type RolesMatch = {
    exist: Role[];
    notExist: string[];
};

export const manageGames: Command = {
    name: 'jogo',
    usage: '!jogo [entrar | sair] jogo1 jogo2 ...',
    description: 'Adiciona ou remove usuário nos canais de jogos',
    flags: [
        {
            name: 'entrar',
            description: 'Adiciona usuário de um ou mais canais',
            example: 'entrar csgo lol',
        },
        {
            name: 'sair',
            description: 'Remove usuário de um ou mais canais',
            example: 'sair lol',
        },
    ],
    async execute(args, message) {
        const [action, ...desiredGames] = args;

        if (!['entrar', 'sair'].includes(action)) {
            const helpResult = await showHelp.execute(args, message);
            const helpAsLeft = map((result: string) => UserError(result))(helpResult);
            return left(valueOf(helpAsLeft));
        }

        const guildRoles = await message.getGuildRoles();
        const authorMember = await message.getAuthorMember();

        const gameRoles = filterGameRoles(guildRoles);
        const rolesMatch: RolesMatch = desiredGames.reduce(
            (obj, role) => {
                const gameRole = gameRoles.find((r) => r.name === role);
                const exists = !!gameRole ? 'exist' : 'notExist';
                const actualRole = gameRole || role;

                return { ...obj, [exists]: [...obj[exists], actualRole] };
            },
            { exist: [], notExist: [] },
        );

        if (rolesMatch.notExist.length > 0) {
            const notExistRolesString = arrayToTextualList(rolesMatch.notExist.map((r) => `\`${r}\``));
            const moderationRole = guildRoles.find((r) => r.name == 'moderador(a)');

            await message.sendChannelMessage(
                getRandomPhrase('notExistsRoles', {
                    moderationRole: moderationRole?.toString(),
                    notExistRolesString,
                }),
            );
        }

        if (rolesMatch.exist.some((role) => role.name === 'lol') && randomBetween(0, 5) === 0) {
            await message.sendChannelMessage(`${authorMember} credo, você também joga LOL?`);
        }

        await message.react(whiteCheckMarkEmoji);

        const resolveActionString = action === 'entrar' ? 'adicionado' : 'removido';
        const resolveAction = action === 'entrar' ? message.addAuthorRole : message.removeAuthorRole;
        await resolveAction(...rolesMatch.exist);

        const existRolesString = arrayToTextualList(rolesMatch.exist.map((r) => `\`${r}\``));

        return right(`${authorMember} foi ${resolveActionString} em ${existRolesString}`);
    },
};
