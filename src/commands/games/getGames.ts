import { Command } from '@core/command';
import { right } from '@core/either';
import { filterGameRoles } from '@core/util';

export const getGames: Command = {
    name: 'jogos',
    description: 'Lista todas os canais de jogos disponíveis',
    async execute(_, message) {
        const gameRoles = filterGameRoles(await message.getGuildRoles());
        const gameRoleNames = gameRoles.reduce((text, role) => `${text}\t\`${role.name}\``, '');

        await message.sendChannelMessage('Jogos disponíveis:' + gameRoleNames);

        const member = message.getAuthorMember();
        return right(`Listagem dos jogos solicitada por ${member}`);
    },
};
