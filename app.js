const fs = require("fs");
const ytdl = require("ytdl-core");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const {OAuth2Client} = require('google-auth-library');

// Download video
const videoUrl = "https://www.youtube.com/watch?v=p6Yw0Bx5dbw";
const videoInfo = ytdl
  .getInfo(videoUrl)
  .then((data) => data)
  .then((data) => data.json()).catch(err => console.error(err))
const videoTitle = videoInfo?.videoDetails?.title || "download";
const videoStream = ytdl(videoUrl);
// Save video to Google Drive
const auth = new OAuth2(
  process.env.CLIENT_ID ||
    "19556260960-nmbagub6jhlr15vnckr8r7mf2fcrll3o.apps.googleusercontent.com", // 19556260960-nmbagub6jhlr15vnckr8r7mf2fcrll3o.apps.googleusercontent.com
  process.env.CLIENT_SECRET || "GOCSPX-7Rw89cShYyJOou7qYaQ-ZUKb4mq", // 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
  process.env.REDIRECT_URI || "https://developers.google.com/oauthplayground"
);

const scopes = [
  'https://www.googleapis.com/auth/drive'
];

// const url = auth.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',
//   // If you only need one scope you can pass it as a string
//   scope: scopes
// });
// console.log('Authorize this app by visiting this url:', url);

const client = new OAuth2Client("19556260960-nmbagub6jhlr15vnckr8r7mf2fcrll3o.apps.googleusercontent.com", "GOCSPX-7Rw89cShYyJOou7qYaQ-ZUKb4mq", "http://localhost:8000");

async function getAccessToken() {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const code = 'YOUR_AUTHORIZATION_CODE';
  const {tokens} = await client.getToken(code);
  console.log(`Access Token: ${tokens.access_token}`);
}

getAccessToken();
// auth.setCredentials({
//   access_token: process.env.ACCESS_TOKEN,
//   refresh_token: process.env.REFRESH_TOKEN,
// });

// const drive = google.drive({ version: "v3", auth });
// const fileMetadata = {
//   name: `${videoTitle}.mp4`,
// };
// const media = {
//   mimeType: "video/mp4",
//   body: videoStream,
// };
// drive.files.create(
//   {
//     resource: fileMetadata,
//     media: media,
//     fields: "id",
//   },
//   function (err, file) {
//     if (err) {
//       // Handle error
//       console.error(err);
//     } else {
//       console.log(`File ID: ${file.data.id}`);
//     }
//   }
// );
