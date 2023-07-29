"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataController_1 = require("../controllers/dataController");
const app = (0, express_1.Router)();
app.get("/datainfo", dataController_1.getIndividualItemInfo);
app.get("/data", dataController_1.getDataList);
app.get("/drive", dataController_1.getDriveList);
exports.default = app;
