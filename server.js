// NODE_ENV=production node server.js to run the server on production mode!!!

const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const cors = require("cors");
const { json } = require("express");
const bcrypt = require("bcrypt");
const path = require('path')
require('dotenv').config()
const DB_KEY = process.env.DB_KEY;



const app = express();
app.use(cors());
app.use(json());
app.use(morgan('dev'))

const dev = app.get('env') !== 'production';

if (!dev) {
    app.disable('x-powered-by')
    app.use(morgan('common')) 

    app.use(express.static(path.resolve(__dirname, 'build')))

    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

if (dev) {
    app.use(morgan('dev'))
}

// const Port = 4000;
app.set('PORT', process.env.PORT || 4000)

mongoose
  .connect(DB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(app.get('PORT'), () => {
      console.log(`listening to port: ${app.get('PORT')}`);
    }); // I wrote here and not anymore bellow, because we want to start listening on that port only once the database is connected and not before
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("<h1>I am here too</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});


app.post("/registerAdmin", async (req, res) => {
  const admin = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  };

  const loginData = JSON.stringify(admin);
  fs.writeFileSync("./secureData/adminPass.json", loginData)
  res.sendStatus(200).send('Admin Created')
});

app.post("/loginAdmin", async (req, res) => {
  let jsonData = "";
  const data = fs.readFileSync("./secureData/adminPass.json", "utf-8");
  const parsedData = JSON.parse(data);
  if (parsedData.email !== req.body.email) {
    res.sendStatus(500);
  }
  jsonData = parsedData;

  try {
    const resultCompare = await bcrypt.compare(
      req.body.password,
      jsonData.password
    );

    if (resultCompare) {
      res.sendStatus(200);
      console.log('the are equal!');
    } else {
      res.sendStatus(500);
      ('sorry, they are not the same')
    }
  } catch {
    (err) => console.log(err);
  }
});

app.post("/createBlog", (req, res) => {
  const newEntry = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  });
  newEntry
    .save()
    .then((response) => res.send(response.body))
    .catch((err) => console.log(err));
});

app.get("/allBlogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

app.get("/search/:entry", (req, res) => {
  const entry = req.params.entry;
  Blog.find({ body: entry }, (error, quest) => {
    if (error) {
      console.log(error);
    }
    res.send(quest);
  });
});

app.delete("/deleteEntry/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.status(202);
    })
    .catch((err) => console.log(err));
});

app.post("/editEntry", (req, res) => {
  Blog.findOne({ _id: req.body._id }, function (err, foundObject) {
    if (err) {
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        foundObject.title = req.body.title;
        foundObject.snippet = req.body.snippet;
        foundObject.body = req.body.body;
        foundObject.save();
      }
    }
  });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
