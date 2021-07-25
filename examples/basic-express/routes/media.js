const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/annotations", function (req, res, next) {
  //send back a json file or something.
  const notes = [
    {
      begin: "0.000",
      children: [],
      end: "2.680",
      id: "f000001",
      language: "eng",
      lines: ["1"],
    },
    {
      begin: "2.680",
      children: [],
      end: "5.880",
      id: "f000002",
      language: "eng",
      lines: ["From fairest creatures we desire increase,"],
    },
    {
      begin: "5.880",
      children: [],
      end: "9.240",
      id: "f000003",
      language: "eng",
      lines: ["That thereby beauty's rose might never die,"],
    },
    {
      begin: "9.240",
      children: [],
      end: "11.920",
      id: "f000004",
      language: "eng",
      lines: ["But as the riper should by time decease,"],
    },
    {
      begin: "11.920",
      children: [],
      end: "15.280",
      id: "f000005",
      language: "eng",
      lines: ["His tender heir might bear his memory:"],
    },
    {
      begin: "15.280",
      children: [],
      end: "18.600",
      id: "f000006",
      language: "eng",
      lines: ["But thou contracted to thine own bright eyes,"],
    },
    {
      begin: "18.600",
      children: [],
      end: "22.800",
      id: "f000007",
      language: "eng",
      lines: ["Feed'st thy light's flame with self-substantial fuel,"],
    },
    {
      begin: "22.800",
      children: [],
      end: "25.680",
      id: "f000008",
      language: "eng",
      lines: ["Making a famine where abundance lies,"],
    },
    {
      begin: "25.680",
      children: [],
      end: "31.240",
      id: "f000009",
      language: "eng",
      lines: ["Thy self thy foe, to thy sweet self too cruel:"],
    },
    {
      begin: "31.240",
      children: [],
      end: "34.280",
      id: "f000010",
      language: "eng",
      lines: ["Thou that art now the world's fresh ornament,"],
    },
    {
      begin: "34.280",
      children: [],
      end: "36.960",
      id: "f000011",
      language: "eng",
      lines: ["And only herald to the gaudy spring,"],
    },
    {
      begin: "36.960",
      children: [],
      end: "40.680",
      id: "f000012",
      language: "eng",
      lines: ["Within thine own bud buriest thy content,"],
    },
    {
      begin: "40.680",
      children: [],
      end: "44.560",
      id: "f000013",
      language: "eng",
      lines: ["And tender churl mak'st waste in niggarding:"],
    },
    {
      begin: "44.560",
      children: [],
      end: "48.080",
      id: "f000014",
      language: "eng",
      lines: ["Pity the world, or else this glutton be,"],
    },
    {
      begin: "48.080",
      children: [],
      end: "53.240",
      id: "f000015",
      language: "eng",
      lines: ["To eat the world's due, by the grave and thee."],
    },
  ];
  res.json(notes);
});

// adapted from https://stackoverflow.com/questions/42590683/node-cant-seek-audio-stream#answer-42591021
router.get("/:mediaId", function (req, res, next) {
  // use an id to get your track etc.
  const mediaId = req.params.mediaId;

  const filePath = __dirname + "/../public/media/audio/Vocals30.mp3";
  const stat = fs.statSync(filePath);
  const total = stat.size;
  if (req.headers.range) {
    const range = req.headers.range;
    const parts = range.replace(/bytes=/, "").split("-");
    const partialstart = parts[0];
    const partialend = parts[1];

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : total - 1;
    const chunksize = end - start + 1;
    const readStream = fs.createReadStream(filePath, {
      start: start,
      end: end,
    });
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mp3",
    });
    readStream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": "audio/mp3",
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

module.exports = router;
