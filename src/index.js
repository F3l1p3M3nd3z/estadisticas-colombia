const express = require('express');
const app = express();
const path = require('path');


const viewspath = path.join(__dirname,"views") 

//static
app.use(express.static(path.join(__dirname +'/public')));

//config
app.set('port', 3000);
app.set('views',viewspath);
app.engine('html', require('ejs').renderFile)
app.set('view engine','ejs');

//routes
app.get('/', (req, res) => {
   res.render("index.html");
   //res.send(__dirname)
});

//lsiten
app.listen(app.get('port'), () => {
    console.log('servidor corriendo en', app.get('port'))
});