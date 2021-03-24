<p align="center"><img src=".github/facom_logo.png" width="80"/></p>
<h2 align="center">facombot</h2>
<p align="center">Bot do Discord do servidor FACOM UFMS</p> 
<p align="center">
    <img src="https://img.shields.io/badge/version-0.2-blue" />
    <img src="https://img.shields.io/badge/status-online-brightgreen" />
</p>

### Sobre

Esse bot tem como objetivo oferecer suporte às funcionalidades do servidor da FACOM no Discord, como:

- Permitir que alunos entrem/saiam dinamicamente de canais de tecnologias e de jogos aos quais tenham interesse
- Atribuir as respectivas turmas aos alunos
- `[futuramente]` Promover iniciativas de gameficação no servidor

#### Tecnologias/conceitos utilizados

- TDD: Como o bot depende do login para conexão com o Discord, os testes permite que todos os interessados possam testar se suas contribuições atendem aos requisitos antes de submetê-las. Os testes utilizam [Jest]() e o [ts-jest]()
- Conceitos de programação funcional: Facilitam a testabilidade dos componentes (evitam `throw`s e side effects indesejados) e melhoram o fluxo das operações ([either.ts](src/core/either.ts), etc).

### TODO

- [x] ~Definir um ambiente para fazer o deploy da aplicação~ container Docker hospedado no AWS EC2
- [x] ~[Comando "!tecnologia [entrar|sair]"](src/commands/tecnologies/manageTechnologies.ts)~
- [x] ~[Comando "!jogo [entrar|sair]"](src/commands/games/manageGames.ts)~
- [ ] Separar a parte comum nas lógicas dos comandos (_manageTechnologies/manageGames_ -> inserir usuário em roles, _get*_ -> exibir roles)
- [ ] [`discord.js` adapter](src/adapters/discordjs.ts) e definição completa das [interfaces de domínio do Discord](src/core/discord.ts)
  - [ ] Implementação do [`mockDiscordjsMessage`](src/adapters/discordjs.ts) para realizar os testes
  - [ ] Escrever casos de teste que dependem do [`mockDiscordjsMessage`](src/adapters/discordjs.ts)
  
### Uso

Crie o `.env` a partir do `.env.example` e preencha o BOT_TOKEN com a crendencial do Discord da aplicação

```bash
# Roda os casos de teste
yarn test

# Inicia a apliação em ambiente de desenvolvimento
yarn start

# Builda a aplicação
yarn build
```
