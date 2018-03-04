let config = require('../config/apiConfig').CONFIG_API,
    bcrypt = require('bcrypt-nodejs'),
    async = require('async'),
    crypto = require('crypto'),
    Method = {
    __app_call: () => {
        return true
    },

    // Verify password
    __verify_password: (password_input, password_hash) => {
        return bcrypt.compareSync(password_input, password_hash)  
    },

    // Generate access token
    __generate_access_token: (object) => {
        return new Buffer(JSON.stringify(object)).toString("base64")
    },

    // Check empty Object
    isEmpty: (obj) => {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false
        }
        return JSON.stringify(obj) === JSON.stringify({})
    },

    // Check header request
    __check_header_request: (req) => {
        if(req['api-key'] === config.__API_KEY && req['api-secret'] === config.__API_SECRET &&  req['api-author'] === config.__API_AUTHOR) {
            return true
        }else {
            return false
        }
    },

    // Generate token password reset
    __generate_reset_password_token: () => {
        return crypto.randomBytes(30).toString('hex')
    },
    
    // Rest API Response
    __api_response: (code, content) => {
        content = JSON.stringify(content)
        switch(code) {
            case 200:
                return {
                    code: 200,
                    status: 'OK',
                    content
                }
            break
            case 400:
                return {
                    code: 400,
                    status: 'ERROR',
                    content
                }
            break
            case 403:
            return {
                code: 403,
                status: 'FORBIDDEN',
                message: 'The request is understood, but it has been refused or access is not allowed'
            }
            break
            case 404:
                return {
                    code: 404,
                    status: 'NOT FOUND',
                    content
                }
            break
        }
    }
}
exports.function = Method