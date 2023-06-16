const router = require('express').Router();
const User = require('../models/User');
// signup

router.post('/signup', async(req, res)=> {
  let {name, email, password,latitude,longitude,accuracy,timestamp} = req.body;
  try {
    const user = await User.create({name, email, password,latitude,longitude,accuracy,timestamp});
    res.json(user);
  } catch (e) {
    if(e.code === 11000) return res.status(400).send('Email already exists');
    res.status(400).send(e.message)
  }
})



// search
router.post('/search', async(req, res)=> {
  const { email} = req.body;

  try {
    const person = await User.findOne({ email: email });
    res.json(person);
  } catch (e) {
    if(e.code === 11000) return res.status(400).send('No user with that email');
    res.status(400).send(e.message)
  }
})

// login
router.post('/login', async(req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// get users;

router.get('/', async(req, res)=> {
  try {
    const users = await User.find({ isAdmin: false }).populate('orders');
    res.json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
//update user
router.patch('/update', async(req, res) => {
  let {id,latitude, longitude,timestamp} = req.body;
  try {
    const user = await User.findByIdAndUpdate(id,{latitude,longitude,timestamp});
    res.json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})


module.exports = router;
