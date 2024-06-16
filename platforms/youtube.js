import socialMedia from '../modules/socialMedia.js';
import hashtags from '../modules/hashtags.js';

export default function generateYouTubeDescription(details) {
  const { episodeTitle, episodeDescription, watchURL, transcriptURL, episodeDetails } = details;

  let description = `
${episodeTitle}

${episodeDescription}

Watch the episode here: ${watchURL}
Read the transcript here: ${transcriptURL}

${socialMedia}

${hashtags}
  `;

  if (episodeDetails) {
    if (episodeDetails.guests && episodeDetails.guests.length > 0) {
      description += '\n\nGuests:\n';
      episodeDetails.guests.forEach(guest => {
        description += `- ${guest.name}\n`;  // Assuming each guest is an object with a 'name' property
      });
    }

    if (episodeDetails.panelists && episodeDetails.panelists.length > 0) {
      description += '\n\nPanelists:\n';
      episodeDetails.panelists.forEach(panelist => {
        description += `- ${panelist.name}\n`;  // Assuming each panelist is an object with a 'name' property
      });
    }

    if (episodeDetails.picks && episodeDetails.picks.length > 0) {
      description += '\n\nPicks:\n';
      episodeDetails.picks.forEach(pick => {
        description += `- ${pick.title} (${pick.url})\n`;  // Assuming each pick is an object with 'title' and 'url' properties
      });
    }
  }

  return description;
}
