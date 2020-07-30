"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const passport_1 = __importDefault(require("passport"));
require("./middlewares/passport");
const app = express_1.default();
//settings
app.set('port', process.env.PORT || 4000);
//middlewares
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
// passport.use(passportMiddleware)
// app.use()
app.get('/', (req, res) => {
    res.send(`This server is running on port ${app.get('port')}`);
});
app.use('/', routes_1.default);
exports.default = app;
