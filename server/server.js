const express = require("express")
const app = express();
const PORT = 3000;

const cors = require('cors')
const fs = require("fs")
const path = require("path");
const bodyParser = require('body-parser');
const formidable = require('formidable');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/upload', (req, res)=>{   
    console.log('wowww')
    let form = formidable({});

    form.multiples = true;
    form.keepFilenames = true;  
    form.keepExtensions = true;
    form.uploadDir = './server/uploads';

    form.on('fileBegin', (name, file) => {
        file.path = path.join(form.uploadDir, file.name);
    });

    form.parse(req, (err, fields, files)=>{});
})

app.post('/get', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    fs.readdir('./server/uploads', (err, files)=>{
        res.send(JSON.stringify({
            files
        }));
    })
})

app.post('/get/:img', (req, res)=>{
    const name = req.params.img;
    res.sendFile(path.join(__dirname, 'uploads', name));
})

app.listen(PORT, () => {
    console.log("Server " + PORT);

    if (!fs.existsSync('./server/uploads')) {
        fs.mkdir('./server/uploads', (err) => {
            if (err) throw err;
        })
    }
})