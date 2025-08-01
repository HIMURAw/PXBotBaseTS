import { Collection } from "discord.js"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

declare module "discord.js" {
    interface Client {
        commands: Collection<
            string,
            {
                data: SlashCommandBuilder
                execute: (interaction: ChatInputCommandInteraction) => Promise<void>
            }
        >
    }
}
