require('./config/db');

const app = require('express')();
const port = 3000;

const UserRouter = require('./api/User.js');

const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user',UserRouter);
console.log(process.cwd());


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
