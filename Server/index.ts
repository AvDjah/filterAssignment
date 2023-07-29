import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes'
import dataRoutes from './routes/dataRoutes'
var cors = require('cors')


const app = express();


const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())
app.use(jsonParser)
app.use(urlEncodedParser)

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(userRoutes)
app.use(dataRoutes)


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


