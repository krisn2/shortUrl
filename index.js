//dependencies
const express = require ('express');
const cookieParser = require ("cookie-parser")
const path = require("path");


//routes
const UserRoute = require("./router/user.router.js")
const urlRoute = require('./router/url.router')
const staticRoute = require("./router/static.Router.js")
const URL = require('./model/url.model.js')



const {connectMongoDB} = require ('./connectDB')
const { restrictToLoggedinUserOnly, checkAuth }= require ("./middlewares/auth.middle.js")





const app = express();
const PORT = 1000;
connectMongoDB("mongodb://localhost:27017/shortURL")


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())



app.use('/url',restrictToLoggedinUserOnly,urlRoute)
app.use("/",checkAuth, staticRoute)
app.use("/user",UserRoute)

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  });


app.listen(PORT, () => console.log(`Server is Stared at port:${PORT}`));