//event routes
// /api/events

const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt')
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events')
const router = Router();
const {validarCampos} = require('../middlewares/validar-campos')
const {check} = require('express-validator');
const { isDate } = require('../helpers/isDate');


//Todas deben de estar validadas por la validacion del JWT
router.use(validarJWT) // pasa por aqui esta validacion para no duplicarla

//Obtener eventos 

router.get('/', getEventos)

//Crear nuevo evento
router.post('/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),



        validarCampos
    ],
    crearEvento)

//Actualizar evento
router.put('/:id',  actualizarEvento)

//Borrar evento

router.delete('/:id', eliminarEvento)

module.exports = router;