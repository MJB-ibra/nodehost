const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const User = require('./mongodb')
const app = express()
const session = require('express-session')
const PORT = process.env.PORT || 3210

app.use(cors({
  origin: "http://localhost:5173", // Update to your frontend URL
  credentials: true, // Allow cookies to be sent
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: 'ibrasecretkey',
  cookie: { secure: true, httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, }


}))

app.get('/home', (req, res) => {
  if (req.session.User) {
    res.json({ success: true, user: req.session.user })

  }
  else {
    res.json({ success: false })
  }
})

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.json({ success: true })
  })
})

app.post('/insert', async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password
  }

  const check = await User.findOne({ username: data.username })
  if (check) {
    res.json({ success: false, message: 'username taken!' })
  }
  else {
    const saltround = 10
    const hashpassword = await bcrypt.hash(data.password, saltround)
    data.password = hashpassword
    try {
      const insert = await User.insertMany(data)
      if (insert) {
        res.json({ success: true})
      }
      else {
        res.json({ success: false, message: 'failled' })
      }
    } catch (error) {
      res.json({ success: false, message: 'server error' })
    }
  }
})

app.post('/log', async (req, res) => {
  const  {
    username,
    password
  } = req.body

  const check = await User.findOne({username })
  if (check) {
    try {
      const checked = await bcrypt.compare(password, check.password)
      if (checked) {
        req.session.user = { username: check.username }
        res.json({ success: true })
      }
      else {
        res.json({ success: false, message: 'Incorrect Username Or Password' })
      }
    } catch (error) {
      console.error(error)
      console.error(error)
      res.json({success:false})
    }
  }
  else {
    res.json({ success: false, message: 'Wrong Details' })
  }

})

app.listen(PORT, '0.0.0.0', () => {
  console.log('.....!!!!......')
})