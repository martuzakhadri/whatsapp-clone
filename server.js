import express from 'express';
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express()
const port = process.env.PORT || 9000



const pusher = new Pusher({
    appId: "1207651",
    key: "82c078e32421d2c86044",
    secret: "1ed1b0c8ab5eadacd012",
    cluster: "ap2",
    useTLS: true
});

//middleware
app.use(express.json())
app.use(cors())



//db config
const connection_url = 'mongodb+srv://admin:admin@123@cluster0.jejkt.mongodb.net/whatsapp?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change)

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,

            });
        } else {
            console.log('error triggering in pusher')
        }
    })

})

//?????

//api routers
app.get('/', (req, res) => {
    res.status(200).send('hello world')
})

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })

});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// listestener
app.listen(port, () => console.log(`Listening on localhost:${port}`))