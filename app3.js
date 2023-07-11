const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

const {google} = require('googleapis');
const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyCmWV2b_RElOJugKno33D8yjgCZoqDwXDg'
});

youtube.search.list({
    part: 'id',
    channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
    maxResults: 50,
    order: 'date'
}, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    const videos = res.data.items;
    console.log(videos);
});


// const drive = google.drive({
//   version: 'v3',
//   auth: 'AIzaSyCmWV2b_RElOJugKno33D8yjgCZoqDwXDg'
// });

// async function main() {
//   const res = await drive.files.create({
//     requestBody: {
//       name: 'testimage.png',
//       mimeType: 'image/png'
//     },
//     media: {
//       mimeType: 'image/png',
//       body: fs.createReadStream('heart.jpeg')
//     }
//   });
//   console.log(res.data);
// }

main().catch(console.error);
