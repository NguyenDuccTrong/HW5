const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const Pusher = require("pusher")
const dbMessages = require("./dbMessages")

dotenv.config()          

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected!")).catch((err) => console.log(err))

app.use(express.json())
app.use(cors())

const pusher = new Pusher({
    appId: "1523178",
    key: "92a36cb2621e9ed21ce0",
    secret: "7aa9a29cec89317ee601",
    cluster: "ap2",
    useTLS: true
  });

const db = mongoose.connection
db.once("open", () => {
    console.log("DB Connected")
    const msgCollection = db.collection("messagingmessages")
    const changeStream = msgCollection.watch()
    changeStream.on('change', change => {
        console.log(change)

        if(change.operationType === "insert") {
            const messageDetails = change.fullDocument
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log("Error trigerring Pusher")
        }
    })
})

app.get("/", (req, res) => res.status(200).send("Hello UIT guys"))
app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    dbMessages.create(dbMessage, (err, data) => {
        if(err)
            res.status(500).send(err)
        else    
            res.status(201).send(data)
    })
})

app.get('/messages/sync', (req, res) => {
    dbMessages.find((err, data) => {
        if(err)
            res.status(500).send(err)
        else    
            res.status(201).send(data)
    })
})

const PORT = process.env.PORT || 8801

app.listen(PORT, () => {
    console.log("Backend server is running!")
}) 