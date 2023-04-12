import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Typescript and node works')
})

app.listen(4321, () => {
    console.log('running on 4321')
})