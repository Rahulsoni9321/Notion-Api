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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4000;
const client_1 = require("@notionhq/client");
const cors_1 = __importDefault(require("cors"));
const notion = new client_1.Client({ auth: process.env.NOTION_KEY });
app.use(express_1.default.json());
console.log(process.env.NOTION_KEY);
app.use((0, cors_1.default)());
app.post("/databases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageid = process.env.NOTION_PAGE_ID;
    const payload = req.body;
    console.log(payload.data);
    try {
        const newDb = yield notion.databases.create({
            parent: {
                type: "page_id",
                //@ts-ignore
                page_id: pageid,
            },
            title: [{
                    type: "text",
                    text: {
                        content: payload.data.dbName
                    }
                }],
            properties: {
                Name: {
                    title: {},
                }
            }
        });
        return res.json({ message: "success", data: newDb });
    }
    catch (error) {
        return res.json({
            message: "Something went wrong while making a database",
            details: error
        });
    }
}));
app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});
