require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const data = require("./data.json");
const Code = require("./models/code");
const id = require("yourid");

// Express Config
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Routes
app.get("/", (req, res) => {
  const { tab } = req.query;

  if (!tab) return res.redirect("/?tab=new");

  res.render("index", {
    lang: data,
    tabs: {
      home: tab === "home",
      new: tab === "new",
    },
  });
});

app.get("/view", async (req, res) => {
  const { id } = req.query;

  if (!id) return res.redirect("/");

  const code = await Code.findOne({ shortId: id });

  if (code) {
    res.render("view", {
      code: code,
    });
  } else {
    res.redirect("/");
  }
});

// Create new code
app.post("/new", async (req, res) => {
  const { code, lang } = req.query;

  try {
    if (!code) {
      res.status(400).send({
        error: "Code is required!",
      });
    } else if (!lang) {
      res.status(400).send({
        error: "Language is required!",
      });
    } else {
      const newCode = new Code({
        shortId: id.generate({
          length: 10,
        }),

        content: code,
        language: lang,
      });

      newCode.save().then((code) => {
        res.status(200).send({
          message: "Created!",
          url: `${req.headers.origin}/view?id=${code.shortId}`,
          status: 200,
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
});

// Db connect
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database connected!");
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
