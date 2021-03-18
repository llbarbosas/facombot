import { Command } from "@core/command";
import { left } from "@core/either";
import { BotError } from "@core/errors";

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
  async execute(_, message) {
    return left(BotError("Alguém tem que implementar isso daqui"));
  },
};
