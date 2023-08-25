const { check } = require('express-validator')

module.exports ={
    validarImagenSize:(err,req,res,next)=>{if(err.code== 'LIMIT_FILE_SIZE'){req.fileValidationError = "Limite 10 MB";}next()},
    validarEditProduct : [
        check('name').notEmpty().withMessage('Debes completar el campo de nombre').trim().escape(),
        check('price').notEmpty().withMessage('Debes completar el campo de precio con un valor valido').bail().isFloat({gt:0}).withMessage('Debes completar el campo de precio con un valor valido').trim().escape(),
        check('category').notEmpty().withMessage('Debes completar el campo de categoria').trim().escape(),
        check('desc').notEmpty().withMessage('Debes completar el campo de descripcion').escape().trim(),
        check('size[0]').notEmpty().withMessage('Debes completar el campo de talle S con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle S con un valor valido').trim().escape(),
        check('size[1]').notEmpty().withMessage('Debes completar el campo de talle M con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle M con un valor valido').trim().escape(),
        check('size[2]').notEmpty().withMessage('Debes completar el campo de talle L con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle L con un valor valido').trim().escape(),
        check('size[3]').notEmpty().withMessage('Debes completar el campo de talle XL con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle XL con un valor valido').trim().escape(),
        check('size[4]').notEmpty().withMessage('Debes completar el campo de talle XXL con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle XXL con un valor valido').trim().escape(),
        //TODO validar campo talle unico
        check('imagenes').custom((value,{req})=>{
          if(req.fileValidationError){
            throw new Error(req.fileValidationError)
          }
          return true
        })
      ],
      validarCrearProducto:[
        check('nombre')
        .notEmpty().withMessage('El nombre del producto es obligatorio.')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.')
        .trim()
        .escape(),
        check('precio').notEmpty().withMessage('El precio del producto es obligatorio.').isNumeric().withMessage('El precio debe ser un valor numérico.').trim().escape(),
        check('id_categoria').notEmpty().withMessage('Debes seleccionar una categoría.').trim().escape(),
        check('talleUnico').if((value, { req }) => !value).isInt({ min: 0 }).withMessage('El talle debe ser entero no negativo.').trim().escape(),
        check('talles').if((value, { req }) => !req.body.talleUnico).isInt({ min: 0 }).withMessage('Los talles deben ser enteros no negativos.').trim().escape(),
        check('tallem').if((value, { req }) => !req.body.talleUnico).isInt({ min: 0 }).withMessage('Los talles deben ser enteros no negativos.').trim().escape(),
        check('tallel').if((value, { req }) => !req.body.talleUnico).isInt({ min: 0 }).withMessage('Los talles deben ser enteros no negativos.').trim().escape(),
        check('tallexl').if((value, { req }) => !req.body.talleUnico).isInt({ min: 0 }).withMessage('Los talles deben ser enteros no negativos.').trim().escape(),
        check('tallexxl').if((value, { req }) => !req.body.talleUnico).isInt({ min: 0 }).withMessage('Los talles deben ser enteros no negativos.').trim().escape(),
        check('descripcion')
        .notEmpty().withMessage('La descripción del producto es obligatoria.')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.')
        .trim()
        .escape(),
        check('imagenes').custom((value, { req }) => {
          if (!req.files || req.files.length === 0) {
            throw new Error('Debes subir al menos una imagen del producto.');
          }
          return true;
        }),
      ],
      validarRegistro:[
        check('nombre').notEmpty().withMessage('Debes completar el campo de nombre').trim().escape(),
        check('apellido').notEmpty().withMessage('Debes completar el campo de apellido').trim().escape(),
        check('email').isEmail().withMessage('Debes completar el campo con un mail valido').trim().escape(),
        check('clave').notEmpty().withMessage('Debes elegir una contraseña').trim().escape(),
        check('avatar').custom((value,{req})=>{
          if(req.fileValidationError){
            throw new Error(req.fileValidationError)
          }
          return true
        })

      ],
      validarLogin:[
        check('email').isEmail().withMessage('Debes completar el campo con un mail valido').trim().escape(),
        check('password').notEmpty().withMessage('Debes ingresar tu contraseña').trim().escape(),
      ],
      validarEditUsuario:[
        check('nombre').notEmpty().withMessage('Debes completar el campo de nombre').trim().escape(),
        check('apellido').notEmpty().withMessage('Debes completar el campo de apellido').trim().escape(), 
        check('avatar').custom((value,{req})=>{
          if(req.fileValidationError){
            throw new Error(req.fileValidationError)
          }
          return true
        })
      ]

}
