const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/about', (req, res) => {
    res.send('About Page');
});
app.get('/contact', (req, res) => {
    res.send('Contact Page');
});
app.listen(5000, () => {
    console.log('Server started on port 3000');
});