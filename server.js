const fs = require("fs");
const ytdl = require("ytdl-core");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(cors());

app.get("/", async (req, res) => {
  console.log("req.query: ", req.query);
  const videoId = ytdl.getURLVideoID(req.query.url);
  const videoInfo = await ytdl.getInfo(videoId);
  await ytdl(req.query.url).pipe(
    fs.createWriteStream(videoInfo.videoDetails.title + ".mp4")
  );
  res.send({ json: req.query, videoInfo });
});

app.listen(8000, () => console.log("App running on 8000"));
