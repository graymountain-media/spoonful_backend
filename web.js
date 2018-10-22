const express = require('express')
const app = express()
const stripe = require('stripe')

app.listen(3003, ()=>{
    console.log("Server up and listening on port: 3003")
})

app.post ('/ephemeral_key',(req,res)=>{
    const stripeVersion = req.query.api_version
    if (!stripe_version) {
        res.status(400).end();
        return;
      }
    console.log(stripeVersion)
})