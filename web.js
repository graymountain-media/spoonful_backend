const express = require('express')
const app = express()
const stripe = require('stripe')('sk_test_4d2d71YdjTMjxJJVknsPJcvO')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3003

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended : true
}))


app.listen(PORT, ()=>{
    console.log("Server up and listening on port: " + PORT)
})
app.get('/',(req,res)=>{
    res.send('This is my app! Hell yeah!')
})

app.post('/ephemeral_keys',(req,res)=>{
    const stripe_version = req.query.api_version
    console.log('Stripe Version: ' + stripe_version)
    if (!stripe_version) {
        res.status(400).end();
        return;
      }
      // This function assumes that some previous middleware has determined the
      // correct customerId for the session and saved it on the request object.
      stripe.ephemeralKeys.create(
        {customer: req.query.customerId},
        {stripe_version: stripe_version}
      ).then((key) => {
        res.status(200).json(key);
      }).catch((err) => {
        console.log(err)
        res.status(500).end();
      });
})

app.post('/charge',(req,res)=>{
  const token = request.body.stripeToken
  const charge = stripe.charges.create ({
    amount: req.body.amount,
    currency: req.body.currency,
    description: 'Example charge',
    source: token
  })
})