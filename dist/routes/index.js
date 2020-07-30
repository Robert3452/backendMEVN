"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_route_1 = __importDefault(require("./profile.route"));
const task_route_1 = __importDefault(require("./task.route"));
const app = express_1.Router();
app.use('/', task_route_1.default);
app.use('/profile', profile_route_1.default);
exports.default = app;
