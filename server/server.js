const express = require("express");
const fileUpload = require("express-fileupload");
var cors = require("cors");
const del = require("del");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(fileUpload());

const { resolveCname } = require("dns");

function callPython(req, res) {
  console.log("in call python function");
  var spawn = require("child_process").spawn;
  console.log(req.body);
  var python = spawn("python3", [
    "./fastqAnalysis.py",
    JSON.stringify(req.body),
  ]);

  dataToSend = ''

  python.stdout.on("data", function (data) {
    dataToSend += data.toString();
  });

  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    console.log(dataToSend);
    res.send({ message: dataToSend});
  });
  console.log("in call python function");
}

const uploadDir = `${__dirname}/../fileExchange/uploads/`;

// const resetUploads = new Promise(function (resolve, reject) {
//   console.log("in reset");
//   fs.readdir(uploadDir, (err, files) => {
//     if (err) throw err;

//     for (const file of files) {
//       fs.unlink(path.join(uploadDir, file), (err) => {
//         if (err) throw err;
//       });
//     }
//   });
//   setTimeout(() => {
//     fs.readdir(uploadDir, (err, files) => {
//       if (files.length < 1) {
//         console.log("actually done");
//         resolve();
//       } else {
//         console.log("still files");
//         reject();
//       }
//     });
//   }, 1000);
// });

app.post("/uploadFastq", async (req, res) => {
  if (req.files === null) {
    return res.status(500).json({ msg: "no file uploaded" });
  }
  const uploadLoc = `${__dirname}/../fileExchange/uploads`;

  const file = req.files.fastq;

  file.mv(`${uploadLoc}/userFile.fastq`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      res.json({ filename: "userFile" });
    }
  });
});

app.post("/analyzeFastq", async (req, res) => {
  if (1 == 2) {
    return res.status(500);
  }
  callPython(req, res);
});

app.listen(5000, () => console.log("listening on 5000"));
