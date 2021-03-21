import { mockDiscordjsMessage } from '@adapters/discordjs';
import { isRight } from '@core/either';
import { getTechnologies } from './getTechnologies';

describe('getTechnologies', () => {
    it('Deve adicionar o usuário aos roles de tecnologia desejados', async () => {
        const message = mockDiscordjsMessage();

        const result = await getTechnologies.execute(['entrar javascript python java'], message);

        expect(isRight(result)).toBe(true);
        // expect(mockUser.roles).toContain(javascriptRole, pythonRole, javaRole)
    });

    it('Deve remover o usuário aos roles de tecnologia desejados', async () => {
        const message = mockDiscordjsMessage();

        const result = await getTechnologies.execute(['sair javascript java'], message);

        expect(isRight(result)).toBe(true);
        // expect(mockUser.roles).toNotContain(javascriptRole, javaRole)
    });
});
