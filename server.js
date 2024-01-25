// server.js
import express from "express";
import axios from "axios";
const axios = axios();
import cheerio from "cheerio";
const cheerio = cheerio();
const app = express();
const port = 3000;

// ... 원래의 getHTML, parsing, getCourse 함수 ...

app.get('/news', async (req, res) => {
    try {
        const newsData = await getCourse(20240123); // 예시 날짜
        res.json(newsData);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
