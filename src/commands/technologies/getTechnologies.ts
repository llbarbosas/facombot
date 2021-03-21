import { Command } from '@core/command';
import { right } from '@core/either';
import { filterTechnologyRoles } from '@core/util';

export const getTechnologies: Command = {
    name: 'tecnologias',
    description: 'Lista todas os canais de tecnologia disponíveis',
    async execute(_, message) {
        const technologyRoles = filterTechnologyRoles(await message.getGuildRoles());
        const technologyRoleNames = technologyRoles.reduce((text, role) => `${text}\t\`${role.name}\``, '');

        await message.sendChannelMessage('Tecnologias disponíveis disponíveis:' + technologyRoleNames);

        const member = message.getAuthorMember();
        return right(`Listagem das tecnologias solicitada por ${member}`);
    },
};
