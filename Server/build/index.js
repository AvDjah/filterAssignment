"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
var cors = require('cors');
const app = (0, express_1.default)();
const jsonParser = body_parser_1.default.json();
const urlEncodedParser = body_parser_1.default.urlencoded({ extended: false });
app.use(cors());
app.use(jsonParser);
app.use(urlEncodedParser);
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(userRoutes_1.default);
app.use(dataRoutes_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
