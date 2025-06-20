const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');

app.set('view engine', 'ejs');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
     res.render("index",{files: files});
    });
});

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, filedata) => {
        res.render('show',{filename: req.params.filename, filedata:filedata});
    })
});

app.post('/create', (req, res) => {
    if (!req.body.title || !req.body.details) {
       console.log("Title  details are missing");
    }else {
  fs.writeFile(`./files/${req.body.title.split(' ').join(' ')}`,req.body.details, (err) => {
   res.redirect('/');
  })}
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 