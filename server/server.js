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

app.listen(PORT, () => {
    console.log("Server " + PORT);

    if (!fs.existsSync('./server/uploads')) {
        fs.mkdir('./server/uploads', (err) => {
            if (err) throw err;
        })
    }
})