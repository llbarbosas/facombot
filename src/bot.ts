// import 'module-alias/register';
process.env.NODE_ENV === 'production' && require('module-alias/register');

import 'dotenv/config';
import { Client } from 'discord.js';
import { botToken } from '@config/discord';
import { onMessage } from './commands/commands';

async function startBot() {
    const client = new Client();

    try {
        await client.on('message', onMessage).login(botToken);
        console.info('[client] Bot listening');
    } catch (err) {
        console.error(`[client] ${err}`);
        client.destroy();
        startBot();
    }
}

startBot();
