require('./config/db');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const bodyParser = require('express').json;
const UserRouter = require('./api/User.js');
const path = require('path');

const port = 3000;
const app = express();

app.use(express.json({limit: '100mb'}));
app.use('/user',UserRouter);



app.post('/predict', async (req, res) => {
    try {

        try {
            if (!req.body || !req.body.image) {
              return res.status(400).json({ message: 'No image data found in request body!' });
            }
            const base64Data = req.body.image; 
            const buffer = Buffer.from(base64Data, 'base64');
            await fs.promises.writeFile(`uploads/test_image.jpg`, buffer);
            
            const response = await axios.get('http://127.0.0.1:8000/predictColor');

            const sortedResult = response.data.result.sort((a, b) => b.score - a.score);
            const highestScoreLabel = sortedResult[0].label;

            res.json({ highestScoreLabel});
          } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).send("Error");
          }

        
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send("Error");
    }
});


app.get("/", (req, res) => {res.send("Hello")})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
