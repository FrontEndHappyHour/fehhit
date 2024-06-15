export default function generateTikTokDescription(details) {
  return `
${details.episodeTitle}

${details.episodeDescription}

Watch the full episode here: ${details.watchURL}

#FrontEndHappyHour #WebDevelopment #Podcast
  `;
}
