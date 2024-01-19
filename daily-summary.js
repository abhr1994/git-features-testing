
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;

const web = new WebClient(token);

async function postDailySummary() {
  // Fetch data from your backend service or other sources
  const codeChanges = getChanges();
  const upcomingDeadlines = getDeadlines();
  const buildStatus = getBuildStatus();

  // Create a message
  const message = `
    *Daily Summary:*
    - Code Changes: ${codeChanges}
    - Upcoming Deadlines: ${upcomingDeadlines}
    - Build Status: ${buildStatus}
  `;

  // Post message to Slack
  try {
    const result = await web.chat.postMessage({
      channel: channelId,
      text: message,
    });
    console.log('Message sent to Slack:', result.ts);
  } catch (error) {
    console.error('Error posting message to Slack:', error);
    process.exit(1);
  }
}

// Call the function
postDailySummary();

