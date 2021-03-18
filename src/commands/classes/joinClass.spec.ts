import { mockDiscordjsMessage } from "@adapters/discordjs";
import { isLeft, isRight } from "@core/either";
import { isUserError } from "@core/errors";
import { joinClass } from "./joinClass";

describe("joinClass", () => {
  it("Deve falhar para turmas que não existem", async () => {
    const message = mockDiscordjsMessage();

    const result = await joinClass.execute(["engcivil"], message);

    expect(isLeft(result) && isUserError(result.left)).toBe(true);
  });

  it("Deve falhar caso o usuário já esteja em uma turma", async () => {
    // TODO: Passar user mock com o role de uma turma
    const message = mockDiscordjsMessage();

    const result = await joinClass.execute(["engsoft19"], message);

    expect(isLeft(result) && isUserError(result.left)).toBe(true);
  });

  it("Deve adicionar o role ao usuário", async () => {
    const message = mockDiscordjsMessage();

    const result = await joinClass.execute(["engsoft19"], message);

    expect(isRight(result)).toBe(true);
    // expect(mockUser.roles).toContain(engsoft19Role);
  });
});
