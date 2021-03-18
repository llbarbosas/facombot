import { mockDiscordjsMessage } from "@adapters/discordjs";
import { isRight } from "@core/either";
import { getTechnologies } from "./getTechnologies";

describe("getTechnologies", () => {
  it("Deve exibir todas as tecnologias disponíveis", async () => {
    const message = mockDiscordjsMessage();
    message.sendChannelMessage = jest.fn();

    const result = await getTechnologies.execute([""], message);

    expect(message.sendChannelMessage).toBeCalledTimes(1);
    expect(isRight(result)).toBe(true);
  });
});
