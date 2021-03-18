import { Command } from "@core/command";
import { Role } from "@core/discord";
import { left, right } from "@core/either";
import { BotError, UserError } from "@core/errors";
import { getRandomPhrase } from "@core/locales";
import { arrayToTextualList, filterTechnologyRoles } from "@core/util";
import { Role as DiscordjsRole } from "discord.js";

type RolesMatch = {
  exist: Role[];
  notExist: string[];
};

export const manageTechnologies: Command = {
  name: "tecnologia",
  description: "Adiciona ou remove usuário nos canais de tecnologia",
  flags: [
    {
      name: "entrar",
      description: "Adiciona usuário de um ou mais canais",
      example: "entrar python javascript",
    },
    {
      name: "sair",
      description: "Remove usuário de um ou mais canais",
      example: "entrar python",
    },
  ],
  async execute(args, message) {
    const [action, ...desiredTechnologies] = args;

    if (!["entrar", "sair"].includes(action)) {
      return left(UserError("unknown action"));
    }

    const guildRoles = await message.getGuildRoles();
    const authorMember = await message.getAuthorMember();

    const technologyRoles = filterTechnologyRoles(guildRoles);
    const rolesMatch: RolesMatch = desiredTechnologies.reduce(
      (obj, role) => {
        const technologyRole = technologyRoles.find((r) => r.name === role);
        const exists = !!technologyRole ? "exist" : "notExist";
        const actualRole = technologyRole || role;

        return { ...obj, [exists]: [...obj[exists], actualRole] };
      },
      { exist: [], notExist: [] }
    );

    if (rolesMatch.notExist.length > 0) {
      const notExistRolesString = arrayToTextualList(
        rolesMatch.notExist.map((r) => `\`${r}\``)
      );
      const moderationRole = guildRoles.find((r) => r.name == "moderador(a)");

      await message.sendChannelMessage(
        getRandomPhrase("notExistsTechnologyRoles", {
          moderationRole,
          notExistRolesString,
        })
      );
    }

    const resolveActionString = action === "entrar" ? "adicionado" : "removido";
    const resolveAction =
      action === "entrar" ? message.addAuthorRole : message.removeAuthorRole;
    await resolveAction(...rolesMatch.exist);

    return right(
      `${authorMember} foi ${resolveActionString} em ${rolesMatch.exist}`
    );
  },
};
