const fs = require('fs');

const productos = JSON.parse(fs.readFileSync('./productos.json')



)

const homeController = {
    list: function (req, res) {

        return res.render('home',{productos:productos})

    }

}

module.exports = homeController