import { mockDiscordjsMessage } from "@adapters/discordjs";
import { isRight } from "@core/either";
import { getClasses } from "./getClasses";

describe("getClasses", () => {
  it("Deve exibir todas as turmas disponíveis", async () => {
    const message = mockDiscordjsMessage();
    message.sendChannelMessage = jest.fn();

    const result = await getClasses.execute([""], message);

    expect(message.sendChannelMessage).toBeCalledTimes(1);
    expect(isRight(result)).toBe(true);
  });
});
