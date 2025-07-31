// src/types/discord.d.ts
import { SlashCommandBuilder, ChatInputCommandInteraction, Collection } from 'discord.js'

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, {
            data: SlashCommandBuilder
            execute: (interaction: ChatInputCommandInteraction) => Promise<void>
        }>
    }
}
