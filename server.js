const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
let app = express()
const port = process.env.PORT || 3000

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

// app.use((req, res, next) => {
//     res.render('maintenence.hbs', {
//         pageTitle: "We'll be right back",
//         paragraph: 'The site is currently updated'
//     })
// })

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getcurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text = "hello") => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMessage: 'Welcome to my page'
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

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})