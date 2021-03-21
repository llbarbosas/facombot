import { Command } from '@core/command';
import { right } from '@core/either';
import { filterClassRoles } from '@core/util';

export const getClasses: Command = {
    name: 'turmas',
    description: 'Lista todas as turmas disponíveis',
    async execute(_, message) {
        const courseClassesRoles = filterClassRoles(await message.getGuildRoles());
        const courseClassNames = courseClassesRoles.reduce((text, role) => `${text}\t\`${role.name}\``, '');
        await message.sendChannelMessage('Turmas disponíveis:' + courseClassNames);

        const member = message.getAuthorMember();
        return right(`Listagem das turmas solicitada por ${member}`);
    },
};
