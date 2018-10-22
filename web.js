const express = require('express')
const app = express()
const stripe = require('stripe')

const PORT = process.env.PORT || 3003

app.listen(PORT, ()=>{
    console.log("Server up and listening on port: " + PORT)
})
app.get('/',(req,res)=>{
    res.send('This is my app!')
})

app.post ('/ephemeral_key',(req,res)=>{
    const stripeVersion = req.query.api_version
    if (!stripe_version) {
        res.status(400).end();
        return;
      }
    console.log(stripeVersion)
})