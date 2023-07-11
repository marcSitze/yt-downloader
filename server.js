const fs = require("fs");
const ytdl = require("ytdl-core");
const express = require("express");
const cors = require("cors");
const app = express();
const {google} = require('googleapis');
const PORT = 8000;

app.use(cors());

app.get("/", async (req, res) => {
  console.log("req.query: ", req.query);
  const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyCmWV2b_RElOJugKno33D8yjgCZoqDwXDg'
  });

  const videos = youtube.search.list({
    part: 'id',
    channelId: req.query.channelId,
    maxResults: 50,
    order: 'date'
  }, (err, resps) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    const videos = resps.data.items;
    console.log(videos);
    videos.forEach(element => {
      downloadVideo(`https://www.youtube.com/watch?v=${element?.id?.videoId}`)
      .then(() => console.log('Video downloaded successfully'))
      .catch((err) => console.error(err));
    });
    return res.send({ json: req.query, videos });
  })
  // res.send({ json: req.query, videos });
});

app.listen(8000, () => console.log("App running on 8000"));

async function downloadVideo(url) {
  const videoInfo = await ytdl.getInfo(url);
  const videoTitle = videoInfo.videoDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const videoStream = ytdl(url, { quality: 'highest' });
  const writeStream = fs.createWriteStream(`${videoTitle}.mp4`);
  videoStream.pipe(writeStream);
  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
}