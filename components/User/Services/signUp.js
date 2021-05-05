
const Dal = require("../UserDal");
const { hashPassword, generateJwt } = require("../../../libs/utils");



/**
    signup crea un nuevo usuario
    signUp crea un nuevo usuario
 * @param {string} email
 * @param {string} password
 * @returns {object} {status: int, response: object}
    
*/

const signUp = async (email, password) =>{

    let response = {};
    let status = 500;
    //let { email, password} = req.body;
    let duplicateUsers = null;
    // buscar por usuarios duplicados
    try {
        duplicateUsers =  await Dal.query(
            "SELECT email FROM Users WHERE email=?",
             [email,]
            );
    } catch (error) {
        response ={

            message: "ha ocurrido un error",
            data: null,
        };
        status = 500;
    }

    //insertar usuario si no existe
    if(duplicateUsers?.length == 0){
        try {
            const result = await Dal.query(
                "INSERT INTO Users (email, password) VALUES (?, ?)",
                [email, hashPassword(password)]
            );
            response = {
                message: "Registro realizado correctamente",
                data: {
                    id: result.insertId,
                    email: email,
                    token: generateJwt({
                        id: result.insertId,
                        email: email,
                    }),//Todo:configurar
                },
            };
            status = 200;
        } catch (error) {
            response = {
                message: error.message,
                data: null
            };
            status = 500;
        }
    }else{
        response = {
            message: `El email ${email} ya está en uso.`,
            data: null,
        };
        status = 400;
    }

    return{
        status,
        response,
    };
};

module.exports = signUp;