const express = require('express')
const app = express();
const fs = require('fs')
const path = require("path");
const port = 3000
const data = require('./data.json')


app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());
app.use(express.static("public"));

app.post('/',(req,res)=>{
    console.log(req.body);
    data.push(req.body);
    fs.writeFileSync("data.json", JSON.stringify(data), err => {
        if (err) throw err;
    });

    fs.readFile("data.json", function (err, d) {
        if (err) throw err;
        data = JSON.parse(d);
    });
    res.send('Data Added')
});


app.get('/data',(req,res)=>{
    res.send(data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})