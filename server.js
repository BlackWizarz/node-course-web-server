const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
let app = express()


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

app.use((req, res, next) => {
    res.render('maintenence.hbs', {
        pageTitle: "We'll be right back",
        paragraph: 'The site is currently updated'
    })
})

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getcurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text = "hello") => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
   res.render('home.hbs', {
       homeTitle: 'HomePage',
       pageTitle: 'Home Page',
       welcomeText: 'Welcome to my page',
       welcomeMessage: 'why is thisss ?'
   })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})