import prompt from 'prompt';
import clipboardy from 'clipboardy';
import axios from 'axios';

// Platform modules
import generateYouTubeDescription from './platforms/youtube.js';
import generateTikTokDescription from './platforms/tiktok.js';
// Import other platform modules here...

// Start the prompt
prompt.start();

// Define the properties we want to ask for
const properties = [
  {
    name: 'platform',
    description: 'Platform (youtube, tiktok, instagram, twitter)',
    type: 'string',
    required: true
  },
  {
    name: 'episodeNumber',
    description: 'Episode number',
    type: 'number',
    required: true
  }
];

// Function to fetch episode data from JSON
async function fetchEpisodeData() {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/FrontEndHappyHour/frontendhappyhour.github.io/main/content/episodes.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching episode data:', error);
    return [];
  }
}

// Function to find episode details by number
function findEpisodeDetails(episodes, number) {
  return episodes.find(episode => episode.number === number);
}

// Get the user input
prompt.get(properties, async (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  // Fetch episode data from JSON
  const episodes = await fetchEpisodeData();
  
  // Find episode details by number
  const episodeDetails = findEpisodeDetails(episodes, result.episode);

  if (!episodeDetails) {
    console.error('Episode not found in JSON data.');
    return;
  }

  let description;
  let additionalText = '';

  // Construct the watch URL
  const watchURL = `https://www.youtube.com/watch?v=${episodeDetails.vid}`;

  // Generate the transcript URL
  let transcriptURL = episodeDetails.title.replace(/ /g, '-').toLowerCase().replace(/---|:-/g, '-').replace(/,|"|\./g, '').replace(/#|"|\./g, '').replace(/'/g, '').replace(/\?/g, '').replace(/a\/b/g, 'ab').trim();
  transcriptURL= "https://www.frontendhappyhour.com/episodes/" + transcriptURL;

  // Generate the description based on the platform
  switch (result.platform.toLowerCase()) {
    case 'youtube':
      description = generateYouTubeDescription({
        episodeTitle: episodeDetails.title,
        episodeDescription: episodeDetails.description,
        watchURL,
        transcriptURL,  // Use generated transcript URL
        episodeDetails
      }) + '\n\n' + additionalText;
      break;
    case 'tiktok':
      description = generateTikTokDescription({
        episodeTitle: episodeDetails.title,
        episodeDescription: episodeDetails.description,
        watchURL,
        transcriptURL,  // Use generated transcript URL
        episodeDetails
      }) + '\n\n' + additionalText;
      break;
    // Add cases for other platforms here...
    default:
      console.error('Unsupported platform specified.');
      return;
  }

  // Copy the description to the clipboard
  clipboardy.writeSync(description);
  console.log('Description generated and copied to clipboard successfully!');
  console.log(description);
});
