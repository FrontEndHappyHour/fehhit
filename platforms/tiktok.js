import hashtags from '../modules/hashtags.js';
export default function generateTikTokDescription(details) {
  return `

${details.episodeDescription}

${hashtags}
  `;
}
