"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const task = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: new Date() },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    sharedWith: { type: [mongoose_1.Schema.Types.ObjectId], ref: "user" }
});
exports.default = mongoose_1.model('task', task);
