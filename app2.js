const fs = require("fs");
const ytdl = require("ytdl-core");
const express = require("express");
const cors = require("cors");
const app = express();
const { google } = require("googleapis");
const PORT = 8000;

app.use(cors());

app.get("/", async (req, res) => {
  const channelUrl = `https://www.youtube.com/channel/${req.query.channelId}/videos`;
  const videoUrls = [];

  ytdl(channelUrl)
    .on("data", (chunk) => {
      const data = chunk.toString();
      const regex = /"\/watch\?v=(.*?)"/g;
      let match;
      while ((match = regex.exec(data)) !== null) {
        videoUrls.push(`https://www.youtube.com/watch?v=${match[1]}`);
      }
    })
    .on("end", () => {
      videoUrls.forEach((url) => {
        ytdl(url, { filter: (format) => format.container === "mp4" }).pipe(
          fs.createWriteStream(`${url}.mp4`)
        );
      });
    });
    res.send("Downloading...")
});

app.listen(PORT, () => console.log("App running on: ", PORT));
