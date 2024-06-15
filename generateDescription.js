import prompt from 'prompt';
import clipboardy from 'clipboardy';

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
    description: 'Platform (youtube, tiktok, instagram, etc.)',
    type: 'string',
    required: true
  },
  {
    name: 'episodeTitle',
    description: 'Title of the episode',
    type: 'string',
    required: true
  },
  {
    name: 'episodeDescription',
    description: 'Brief description of the episode',
    type: 'string',
    required: true
  },
  {
    name: 'watchURL',
    description: 'URL to watch the episode',
    type: 'string',
    required: true
  },
  {
    name: 'transcriptURL',
    description: 'URL to view the episode transcript',
    type: 'string',
    required: true
  }
];

// Get the user input
prompt.get(properties, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  let description;

  // Generate the description based on the platform
  switch (result.platform.toLowerCase()) {
    case 'youtube':
      description = generateYouTubeDescription(result);
      break;
    case 'tiktok':
      description = generateTikTokDescription(result);
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
