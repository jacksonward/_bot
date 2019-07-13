# _bot

#### A discord bot with a concise calling system to supply soundbites as quickly as possible.

## Usage
### Start Bot
(After adding to server)

In terminal - `node ./bot.js`

#### Join / Leave
In Discord -

`.join` Joins the voice channel of the user who called it, if they are in one

`.leave` Leaves the voice channel it is currently in


#### Add Clips
To add sound bites, use `.addclip <alias> <url> [start time] [end time]`

For example, `.addclip watermelon https://www.youtube.com/watch?v=6tpCJ2zAAbY`  will add a clip that is callable with
`.watermelon` that, when called, will play the designated video.
