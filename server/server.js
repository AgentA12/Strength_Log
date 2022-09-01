const app = require("express")();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("hello")
})

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
