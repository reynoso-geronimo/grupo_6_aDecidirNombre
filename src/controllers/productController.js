const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator')


const productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/productos.json"), "utf-8")); //esto puede traer problemas posible solucion transformarlo en una funcion y que cada funcion la invoque para siempre estar actualizada
const categorias = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/categorias.json"), "utf-8")); //esto puede traer problemas posible solucion transformarlo en una funcion y que cada funcion la invoque para siempre estar actualizada

const productDetailController = {
  list: function (req, res) {
    if (req.params.categoria) {
      let prodCategorias = productos.filter(row => row.categoria == req.params.categoria)
      return res.render("products/productList", { productos: prodCategorias });

    } else {
      return res.render("products/productList", { productos: productos });
    }

  },
  detail: function (req, res) {
    const producto = productos.find((row) => row.id == req.params.id);

    return res.render("products/productDetail", { producto: producto });
  },
  editForm: function (req, res) {
    const producto = productos.find((row) => row.id == req.params.id);
    return res.render("products/productEdit", { producto: producto, categorias: categorias });
  },
  editItem: function (req, res) {
    
    let multerExtensionError = req.fileValidationError? {type:"file",msg:req.fileValidationError}:null
    let errors = validationResult(req)
    multerExtensionError?errors.errors.push(multerExtensionError):""
    const producto = productos.find((row) => row.id == req.params.id);
    if (errors.isEmpty()) {// no hay errores de express-validator
      producto.nombre = req.body.name
      producto.precio = req.body.price
      producto.descripcion = req.body.desc
      producto.categoria = req.body.category
      producto.talles = req.body.size[0]
      producto.tallem = req.body.size[1]
      producto.tallel = req.body.size[2]
      producto.tallexl = req.body.size[3]
      producto.tallexxl = req.body.size[4]


      // chequeo en que forma llega la informacion de los checkboxes, quizas un switch seria mejor

      if (req.body.imgDelete && typeof req.body.imgDelete == "object") {

        for (const img of req.body.imgDelete) {
          fs.unlinkSync(path.resolve(__dirname, '../../public/' + img))
          producto.imagenes = producto.imagenes.filter(row => row != img)

        };
      } else if (req.body.imgDelete && typeof req.body.imgDelete == "string") {
        producto.imagenes = producto.imagenes.filter(row => row != req.body.imgDelete)
        fs.unlinkSync(path.resolve(__dirname, '../../public/' + req.body.imgDelete))
      }

      if (req.files.length > 0) {
        req.files.forEach((file) => {
          producto.imagenes.push("/images/productos/" + file.filename);
        });
      }

      fs.writeFileSync(path.resolve(__dirname, "../database/productos.json"), JSON.stringify(productos, null, 2))

      return res.redirect("/product/" + req.params.id + "/editform")
    }
    else //si hay errores de express validator devuelvo como se completaron los campos a la vista
    {
      const old = { ...producto }
      old.nombre = req.body.name
      old.precio = req.body.price
      old.descripcion = req.body.desc
      old.categoria = req.body.category
      old.talles = req.body.size[0]
      old.tallem = req.body.size[1]
      old.tallel = req.body.size[2]
      old.tallexl = req.body.size[3]
      old.tallexxl = req.body.size[4]
      if (req.files.length > 0) {
        req.files.forEach((file) => {
          producto.imagenes.push("/images/productos/" + file.filename);
          fs.writeFileSync(path.resolve(__dirname, "../database/productos.json"), JSON.stringify(productos, null, 2))
        });
      }

      
      return res.render("products/productEdit", { producto: old, errors: errors.mapped() , categorias: categorias })
    }
  },

  crearProductoForm: function (req, res) {
    return res.render("products/crearProducto", { categorias: categorias });
  },
};

module.exports = productDetailController;
