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
exports.createTask = exports.getTasks = void 0;
const Tasks_1 = __importDefault(require("../models/Tasks"));
exports.getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const response = yield Tasks_1.default.find({ owner: user._id });
        return res.json(response);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        let task = new Tasks_1.default();
        const user = req.user;
        if (!user)
            return res.json({ message: "no" });
        task.owner = user._id;
        task.title = title;
        task.description = description;
        yield task.save();
        return res.json({ message: "the task have been saved successfully" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
