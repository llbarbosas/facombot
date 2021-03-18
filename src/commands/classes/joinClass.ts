import { Role } from "@core/discord";
import { Command } from "@core/command";
import { left, right } from "@core/either";
import { UserError } from "@core/errors";
import { getRandomPhrase } from "@core/locales";
import { filterClassRoles } from "@core/util";

export const joinClass: Command = {
  name: "turma",
  description: `Inscreve o aluno numa turma. Use "!turmas" para listar as turmas disponíveis`,
  async execute(args, message) {
    const [desiredClassRoleName] = args;

    const guildRoles = await message.getGuildRoles();
    const courseClasses = filterClassRoles(guildRoles);

    const desiredClassRole = courseClasses.find(
      (role) => role.name === desiredClassRoleName
    );

    if (!desiredClassRole) {
      return left(
        UserError(
          `${getRandomPhrase("unknownClass", {
            className: desiredClassRoleName,
          })} ${getRandomPhrase("allClasses")}`
        )
      );
    }

    const member = message.getAuthorMember();

    const userCurrentClassRole = await message.findAuthorRole((role) =>
      courseClasses.some((classRole) => classRole.name === role.name)
    );

    if (userCurrentClassRole) {
      const moderationRole = guildRoles.find((r) => r.name == "moderador(a)");

      return left(
        UserError(
          `${getRandomPhrase("stopAction", {
            member,
          })} Você já está matriculado na turma ${
            userCurrentClassRole.name
          }. ${getRandomPhrase("callModeration", { moderationRole })}`
        )
      );
    }

    await message.addAuthorRole(desiredClassRole);
    await message.sendChannelMessage(
      getRandomPhrase("welcomeClass", { member, classRole: desiredClassRole })
    );

    return right(`${member} foi adicionado à turma ${desiredClassRole}`);
  },
};
