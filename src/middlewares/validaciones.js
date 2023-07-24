const { check } = require('express-validator')

module.exports ={
    validarEdit : [
        check('name').notEmpty().withMessage('Debes completar el campo de nombre').trim().escape(),
        check('price').notEmpty().withMessage('Debes completar el campo de precio con un valor valido').bail().isFloat({gt:0}).withMessage('Debes completar el campo de precio con un valor valido').trim().escape(),
        check('category').notEmpty().withMessage('Debes completar el campo de categoria').trim().escape(),
        check('desc').notEmpty().withMessage('Debes completar el campo de descripcion').escape().trim(),
        check('size[0]').notEmpty().withMessage('Debes completar el campo de talle S con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle S con un valor valido').trim().escape(),
        check('size[1]').notEmpty().withMessage('Debes completar el campo de talle M con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle M con un valor valido').trim().escape(),
        check('size[2]').notEmpty().withMessage('Debes completar el campo de talle L con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle L con un valor valido').trim().escape(),
        check('size[3]').notEmpty().withMessage('Debes completar el campo de talle XL con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle XL con un valor valido').trim().escape(),
        check('size[4]').notEmpty().withMessage('Debes completar el campo de talle XXL con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle XXL con un valor valido').trim().escape(),
        check('imagenes').custom((value,{req})=>{
          if(req.fileValidationError){
            throw new Error(req.fileValidationError)
          }
          return true
        })
      ]
}