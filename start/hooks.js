'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    const _ = use('lodash');
    const Response = use('Adonis/Src/Response')

    const responses = [
        { status: 200, name: 'success', code: 'SUCCESS' },
        { status: 400, name: 'badRequest', code: 'BAD_REQUEST' },
        { status: 401, name: 'unAuthorized', code: 'UNAUTHORIZED' },
        { status: 403, name: 'forbidden', code: 'FORBIDDEN' },
        { status: 404, name: 'notFound', code: 'NOT_FOUND' },
        { status: 500, name: 'system', code: 'SYSTEM' }
    ]

    responses.forEach((res) => {

        Response.macro(res.name, function (data, overrideStatus, message = null, code = null) {
            if (typeof overrideStatus === 'function') {
                return overrideStatus()
            }

            const status = overrideStatus || res.status;
            const result = _.find(responses, { status: status });
            code = code || result.code;
            switch (status) {
                case 200:
                    if (data) {
                        this.status(status).send({
                            status: res.status,
                            code: res.code,
                            message: 'successful',
                            data: data
                        });
                    } else {
                        this.status(status).send({
                            status: res.status,
                            code: res.code,
                            message: 'successful'
                        });
                    }
                    break;

                default:
                    let code = '';
                    message = message || res.name;
                    if (message.indexOf(':') != -1) {
                        code = message.substr(0, message.indexOf(':'))
                        message = message.substr(message.indexOf(':') + 2)
                    } else {
                        code = type;
                        if (_.isArray(message)) {
                            message = _.join(message.map((item) => item['message']), '\n');
                        }
                    }

                    this.status(status).send({
                        status: status,
                        type: type,
                        error: {
                            code,
                           message
                        }
                    });
                    break;
            }
        })
    })
})
