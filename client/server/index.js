const responseData = require('./tree-data.json');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

var router = express.Router();

/* GET tree-data response */
router.get('/tree-data', function(req, res, next) {
    console.log('entering into the route');
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(200);
    res.send(responseData);
});

app.use(router);

//Request headers
app.use(cors());
app.options('*', cors());

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
