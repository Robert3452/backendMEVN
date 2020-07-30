"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = exports.profile = void 0;
const User_1 = __importDefault(require("../models/User"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user);
        if (!user)
            throw { message: "User not found" };
        return res.json(user);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = new User_1.default();
        const { email, name, password } = req.body;
        if (!email || !name || !password)
            throw "complete the fields";
        user.email = email;
        user.password = password;
        user.name = name;
        yield user.save();
        return res.json({ message: "user created" });
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400 //un día
    });
}
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (!user)
            throw "user does not exist";
        const match = yield user.comparePasswords(password);
        if (!match)
            throw "password mismatch, please try again";
        //SIGN A TOKEN
        const token = createToken(user);
        return res.header('token', token).json({ message: "loged in!", token });
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
