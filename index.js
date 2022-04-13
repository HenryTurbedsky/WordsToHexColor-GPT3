const express = require("express");
const path = require("path");
const ejs = require("ejs");

// File with OpenAI
const Ai = require("./Ai")

const app = express();
const port = 3000;

// Setup body-parser so POST request can be parsed
const bp = require("body-parser");
app.use(bp.urlencoded({ extended: true }));

// Setup view engine
app.set("views", "");
app.set("view engine", "ejs");



// Setup Router
const router = express.Router();

// Home Page
router.get("/", function(req, res){
  console.log("Home Page");
  res.render("page", {hex: "#C8C8C8", colorName:"Fog", hexDisplay: "#C8C8C8"})
});

// Receive POST requests and respond
router.post("/", async function(req, res, next){
  
  // Call the OpenAI based color function
  const color = await Ai.getColor(req.body.color);
  console.log(color);

  if( color == "ERROR" || color == "Too Long" )
    res.render("page", {hex: "#C8C8C8", colorName:req.body.color, hexDisplay: color});
  else
    res.render("page", {hex: color, colorName:req.body.color, hexDisplay: color});
});

app.use("/", router);



// Start Server
app.listen(port,function(){
  console.log("server on port: " + app.get("port"));
});