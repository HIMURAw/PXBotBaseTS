import { Client, REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";

const Config = require("./../config.js");

export async function loadCommands(client: Client) {
    const commands: any[] = []
    const commandPath = path.join(__dirname, '../commands')

    fs.readdirSync(commandPath).forEach(folder => {
        const files = fs.readdirSync(`${commandPath}/${folder}`).filter(file => file.endsWith('.ts'))

        for (const file of files) {
            const command = require(`${commandPath}/${folder}/${file}`)
            client.commands.set(command.data.name, command)
            commands.push(command.data.toJSON())
        }
    })

    const rest = new REST({ version: '10' }).setToken(Config.discord.token!)

    try {
        console.log('🔁 Slash komutları yükleniyor...')
        await rest.put(Routes.applicationCommands(Config.discord.clientId!), { body: commands })
        console.log('✅ Slash komutları başarıyla yüklendi!')
    } catch (err) {
        console.error(err)
    }
}
