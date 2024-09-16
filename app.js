import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const api = "https://v2.jokeapi.dev/joke/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("app.ejs", {
    content: "",
  });
});

app.post("/", async (req, res) => {
  const myType = req.body.type.toLowerCase();

  try {
    const response = await axios.get(api + myType);
    console.log(response.data);
    if (response.data && response.data.setup) {
      res.render("app.ejs", {
        content: response.data.setup,
      });
    } else {
      res.render("app.ejs", {
        content: "Invalid input",
      });
    }

    // res.render("app.ejs", {
    //   content: response.data.setup,
    // });
  } catch (error) {
    console.error("There is an error ", error.message);
    res.render("app.ejs", {
      content: "Invalid input",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
