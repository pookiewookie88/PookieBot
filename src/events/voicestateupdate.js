const { EmbedBuilder } = require("discord.js");
const allowedList = {
  // format : GUILD / SERVER ID : CHANNEL ID
  "1294938335323623457": ["1294938335323623461"], // YASS
  "1372876206143311932": ["1373864741260230768"], // LR
  "1258009982532583425" : ["1258015727491878923"], //BD
  "555869449161408533": ["1322998434743189565"] //OM
};

const allowedLogs = {
  // format : GUILD / SERVER ID : CHANNEL ID
  "1294938335323623457": "1333048824557600778", // Server-specific logging channels
  "1372876206143311932": "1372883955875053568", // LR
  "1258009982532583425": "1347840248297689231", //BD
  "555869449161408533": "677518233032589312", //OM
};

const exemptRoles = {
  "1258009982532583425": ["1314369396193493085"], // 
};
const activeUsers = new Map();

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    const member = newState.member;
    const botMember = newState.guild.members.me;
    const guild = newState.guild;

    if (!newState.channel) {
      activeUsers.delete(member.id);
      return;
    }

    if (!allowedList[guild.id]?.includes(newState.channel.id)) return;

    if (!newState.channel.permissionsFor(botMember).has("MoveMembers")) {
      console.log(`❌ Bot lacks permission to move members in ${guild.name}.`);
      return;
    }
    // Check if user has an exempt role
    if (exemptRoles[guild.id]?.some(roleId => member.roles.cache.has(roleId))) {
      console.log(`⚠️ Ignoring ${member.user.tag} because they have an exempt role.`);
      return;
    }

    const logChannelId = allowedLogs[guild.id];
    const logChannel = logChannelId ? guild.channels.cache.get(logChannelId) : null;

    if (!oldState.channel && newState.channel) {
      console.log(`🎤 ${member.user.tag} joined VC: ${newState.channel.name}`);

      setTimeout(async () => {
        try {
          // Refetch member and voice state to ensure they're still in the channel and haven't enabled video
          const refreshedMember = await guild.members.fetch(member.id).catch(() => null);
          const refreshedState = refreshedMember?.voice;
          if (
            refreshedState &&
            refreshedState.channel &&
            refreshedState.channel.id === newState.channel.id &&
            !refreshedState.selfVideo
          ) {
            await refreshedState.disconnect().catch(console.error);
            await member.send("⚠️ You were removed for not turning on your camera!").catch(console.error);

            if (logChannel) {
              const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("User Kicked from VC")
                .setDescription(`${member.user.tag} was removed from channel for not turning on the camera.`)
                .setTimestamp();

              logChannel.send({ embeds: [embed] }).catch(console.error);
            }
          } else if (
            refreshedState &&
            refreshedState.channel &&
            refreshedState.channel.id === newState.channel.id &&
            refreshedState.selfVideo
          ) {
            activeUsers.set(member.id, true);
          }
        } catch (error) {
          console.error(`Error handling user join: ${error.message}`);
        }
      }, 120000);
    }

    if (oldState.selfVideo && !newState.selfVideo) {
      console.log(`🚨 ${member.user.tag} turned OFF the camera in VC: ${newState.channel.name}`);

      if (activeUsers.has(member.id)) {
        setTimeout(async () => {
          try {
            // Refetch member and voice state to ensure they're still in the channel and camera is still off
            const refreshedMember = await guild.members.fetch(member.id).catch(() => null);
            const refreshedState = refreshedMember?.voice;
            if (
              refreshedState &&
              refreshedState.channel &&
              refreshedState.channel.id === newState.channel.id &&
              !refreshedState.selfVideo
            ) {
              await refreshedState.disconnect().catch(console.error);
              await member.send("⚠️ You were removed for turning off your camera!").catch(console.error);

              if (logChannel) {
                const embed = new EmbedBuilder()
                  .setColor("Red")
                  .setTitle("User Kicked from VC")
                  .setDescription(`${member.user.tag} was removed from channel for turning off the camera.`)
                  .setTimestamp();

                logChannel.send({ embeds: [embed] }).catch(console.error);
              }
            }
          } catch (error) {
            console.error(`Error handling camera off: ${error.message}`);
          }
        }, 120000);
      }
    }

    if (!oldState.selfVideo && newState.selfVideo) {
      console.log(`✅ ${member.user.tag} turned ON the camera`);
      activeUsers.set(member.id, true);
    }
  },
};