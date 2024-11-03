
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import { scheduler } from "..";
import { ImpossibleScheduledEvent, TooFarAwayScheduledEvent } from "../utils/scheduler";

import type { Command } from "./index";
import type { ChatInputCommandInteraction } from "discord.js";


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);

export const scheduleCommand = {
  data: new SlashCommandBuilder()
    .setName("schedule")
    .setDescription("Scheduled a message to be sent at a specific time.")
    .addChannelOption(option =>
      option.setName("channel")
        .setDescription("Channel to send in")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("message")
        .setDescription("Message to be sent")
        .setRequired(true)
    ).addStringOption(option =>
      option.setName("time")
        .setDescription("Time to send message, in the format of HH:mm")
        .setRequired(true)
    ).addIntegerOption(option =>
      option.setName("day")
        .setDescription("Day to send message on")
        .setRequired(false)
    ).addIntegerOption(option =>
      option.setName("month")
        .setDescription("Month to send message on")
        .addChoices(
          { name: "January", value: 1 },
          { name: "February", value: 2 },
          { name: "March", value: 3 },
          { name: "April", value: 4 },
          { name: "May", value: 5 },
          { name: "June", value: 6 },
          { name: "July", value: 7 },
          { name: "August", value: 8 },
          { name: "September", value: 9 },
          { name: "October", value: 10 },
          { name: "November", value: 11 },
          { name: "December", value: 12 }
        )
        .setRequired(false)
    ).addIntegerOption(option =>
      option.setName("year")
        .setDescription("Year to send message on")
        .addChoices(
          { name: "2024", value: 2024 },
        )
        .setRequired(false)
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    const permissions = interaction.member?.permissions;
    // You can only run the command if you're an administrator
    if (!permissions || typeof permissions === "string" || !permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.editReply({ content: "You cannot run this command." });
    }

    // Setup all variables for the interaction
    const channel = interaction.options.getChannel("channel");
    if (!channel) { return interaction.editReply({ content: "Missing channel" }); }

    const message = interaction.options.getString("message");
    if (!message) { return interaction.editReply({ content: "Missing Message" }); }

    const time = interaction.options.getString("time");
    if (!time) { return interaction.editReply({ content: "Missing Time" }); }

    const parsedTime = time.split(":").map(num => parseInt(num));
    if (parsedTime.length !== 2) { return interaction.editReply({ content: "Invalid time format, please use HH:mm" }); }
    const [hours, minutes] = parsedTime as [number, number];

    const day = interaction.options.getInteger("day") ?? dayjs().date();
    const month = (interaction.options.getInteger("month") ?? (dayjs().month() + 1)) - 1;
    const year = interaction.options.getInteger("year") ?? dayjs().year();

    // Create all dates in the America/New_York timezone
    const date = dayjs.tz({
      year: year,
      month: month,
      day: day,
      hour: hours,
      minute: minutes,
    }, "America/New_York");

    // Setup scheduled event
    const channelId = channel.id;
    const guildId = interaction.guildId;
    if (!guildId) { return interaction.editReply({ content: "Unknown Guild..." }); }

    try {
      await scheduler.scheduleEvent({
        channelId,
        guildId,
        message,
        unixExecutionTime: date.valueOf(),
      });
    } catch (err) {
      if (err instanceof ImpossibleScheduledEvent || err instanceof TooFarAwayScheduledEvent) {
        return interaction.editReply({ content: err.message });
      }

      throw err;
    }

    return interaction.editReply(`Will be sent at <t:${date.unix()}:F> and will take ${date.valueOf() - dayjs().valueOf()} ms in <#${channelId}>.`);
  },
} as Command;