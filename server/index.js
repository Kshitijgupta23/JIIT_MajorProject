require('./config/db');

const app = require('express')();
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const { Image } = require('image-js');
const fs = require('fs');
const port = 3000;

// const upload = multer({ dest: 'uploads/' });


// const modelFile = '../assets/model_unquant.tflite';
// const labelsFile = '../assets/labels.txt';

// let model;
// (async () => {
//   model = await tf.loadGraphModel(`file://${modelFile}`);
// })();

// app.post('/predict', upload.single('image'), async (req, res) => {
//   try {
//     const image = await Image.load(req.file.path);
    
//     // Preprocess the image (resize, convert to tensor, normalize, etc.)
//     // Your preprocessing steps here...
    
//     const inputTensor = tf.tensor(image.data, [1, image.height, image.width, image.channels], 'float32');
//     const predictions = model.predict(inputTensor);

//     const topPredictions = predictions[0]
//       .dataSync()
//       .map((score, index) => ({ label: index, score }))
//       .sort((a, b) => b.score - a.score)
//       .slice(0, 5);

//     const labels = fs.readFileSync(labelsFile, 'utf-8').split('\n');

//     const result = topPredictions.map(({ label, score }) => ({
//       label: labels[label],
//       score: score.toFixed(4),
//     }));

//     res.json({ result });
//   } catch (error) {
//     console.error('Error processing image:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

const UserRouter = require('./api/User.js');

const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user',UserRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
