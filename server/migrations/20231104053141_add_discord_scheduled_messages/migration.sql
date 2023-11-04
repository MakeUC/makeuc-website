-- CreateTable
CREATE TABLE "DiscordScheduledMessage" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "guildId" TEXT NOT NULL DEFAULT '',
    "channelId" TEXT NOT NULL DEFAULT '',
    "unixExecutionTime" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiscordScheduledMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DiscordScheduledMessage_guildId_idx" ON "DiscordScheduledMessage"("guildId");

-- CreateIndex
CREATE INDEX "DiscordScheduledMessage_channelId_idx" ON "DiscordScheduledMessage"("channelId");
