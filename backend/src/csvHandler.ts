import * as fs from 'fs';
import 'dotenv/config';
// import * as csv from 'csv-parser';
import { Recipient } from './types';
const csv = require('csv-parser');   

const csvDatabaseFilePath = process.env.DATABASE_FILE_PATH;
const recipientsList: Recipient[] = [];
export function getRecipientsList(): Recipient[] {
    if (!csvDatabaseFilePath) {
        throw new Error('DATABASE_FILE_PATH is not defined in environment variables.');
    }
    fs.createReadStream(csvDatabaseFilePath)
        .pipe(csv())
        .on('data', (data:any) => {
            const recipient: Recipient = {
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
