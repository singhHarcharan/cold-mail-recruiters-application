"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipientsList = getRecipientsList;
const fs = __importStar(require("fs"));
require("dotenv/config");
const csv = require('csv-parser');
const csvDatabaseFilePath = process.env.DATABASE_FILE_PATH;
const recipientsList = [];
function getRecipientsList() {
    if (!csvDatabaseFilePath) {
        throw new Error('DATABASE_FILE_PATH is not defined in environment variables.');
    }
    fs.createReadStream(csvDatabaseFilePath)
        .pipe(csv())
        .on('data', (data) => {
        const recipient = {
            id: data['ID'],
            name: data['Name'],
            email: data['Email Address'],
            company: data['Company'],
            jobProfile: data['Job Profile'],
            toSend: false,
        };
        recipientsList.push(recipient);
    })
        .on('end', () => {
        console.log(recipientsList);
    });
    return recipientsList;
}
getRecipientsList();
