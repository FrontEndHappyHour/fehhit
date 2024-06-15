import socialMedia from '../modules/socialMedia.js';
import hashtags from '../modules/hashtags.js';

export default function generateYouTubeDescription(details) {
  return `
${details.episodeTitle}

${details.episodeDescription}

Watch the episode here: ${details.watchURL}
Read the transcript here: ${details.transcriptURL}

${socialMedia}

${hashtags}
  `;
}
