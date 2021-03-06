const express = require('express')

const router = express.Router()

const Author = require('../models/author')

router.get('/',(req, res)=>{
    res.render('authors/index', {title: "All Authors List"})
})

router.get('/new',(req, res)=>{
    res.render('authors/new', {title:"New Author Add", author: new Author() })
})

router.post('/', (req, res)=>{
    const author = new Author({
        name:req.body.name    
    })
    author.save((err, newAuthor) => {
        if (err) {
            res.render('authors/new', {
                author: author,
                errorMessage: 'Error creating Author'
            })
        } else {
            // res.redirect(`authors/${newAuthor.id}`)
            res.redirect(301,'authors')
        }
    })
    console.log(author)
}) 

module.exports = router