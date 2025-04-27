const { EmbedBuilder } = require("discord.js");

const allowedList = {
  "1294938335323623457": ["1350472732516679710"], // YASS
  "555869449161408533": ["1234171001030574111"], //OM
};

const allowedLogs = {
  "1294938335323623457": "1333048824557600778", // Server-specific logging channels
  "555869449161408533": "677518233032589312", //OM
};

const exemptRoles = {
//   "1258009982532583425": ["1314369396193493085"],
};
const activeUsers = new Map();

module.exports = {
  name: "voiceStateUpdate", // Ensure the event name is correct
  async execute(oldState, newState) {
    // console.log("Voice state update detected"); // Initial debug log

    const member = newState.member;
    const botMember = newState.guild.members.me;
    const guild = newState.guild;


    if (!newState.channel) {
      activeUsers.delete(member.id);
      return;
    }

    if (!allowedList[guild.id]?.includes(newState.channel.id)) {
      return;
    }

    if (!newState.channel.permissionsFor(botMember).has("MoveMembers")) {
      console.log(`❌ Bot lacks permission to move members in ${guild.name}.`);
      return;
    }
    
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
          if (newState.channel && !newState.selfVideo && newState.mute) {
            await newState.disconnect().catch(console.error);
            await member.send("⚠️ You were removed for not turning on your camera or microphone!").catch(console.error);

            if (logChannel) {
              const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("User Kicked from VC")
                .setDescription(`${member.user.tag} was removed for neither using their camera nor microphone.`)
                .setTimestamp();

              await logChannel.send({ embeds: [embed] }).catch(console.error);
            }
          } else {
            activeUsers.set(member.id, true);
          }
        } catch (error) {
          console.error("Error handling user removal for inactivity:", error);
        }
      }, 120000);
    }

    if ((oldState.selfVideo || !oldState.mute) && (!newState.selfVideo && newState.mute)) {
      console.log(`🚨 ${member.user.tag} has disabled both camera and mic in VC: ${newState.channel.name}`);

      if (activeUsers.has(member.id)) {
        setTimeout(async () => {
          try {
            if (!newState.selfVideo && newState.mute) {
              await newState.disconnect().catch(console.error);
              await member.send("⚠️ You were removed for disabling both your camera and microphone!").catch(console.error);

              if (logChannel) {
                const embed = new EmbedBuilder()
                  .setColor("Red")
                  .setTitle("User Kicked from VC")
                  .setDescription(`${member.user.tag} was removed for disabling both their camera and microphone.`)
                  .setTimestamp();

                await logChannel.send({ embeds: [embed] }).catch(console.error);
              }
            }
          } catch (error) {
            console.error("Error handling user removal for disabling camera and microphone:", error);
          }
        }, 120000);
      }
    }

    if (!oldState.selfVideo && !oldState.mute && (newState.selfVideo || !newState.mute)) {
      console.log(`✅ ${member.user.tag} is now using camera or microphone`);
      activeUsers.set(member.id, true);
    }
  },
};