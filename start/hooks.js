'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    const _ = use('lodash');
    const Response = use('Adonis/Src/Response')

    const responses = [
        { status: 200, name: 'success', type: 'SUCCESS' },
        { status: 400, name: 'badRequest', type: 'BAD_REQUEST' },
        { status: 401, name: 'unAuthorized', type: 'UNAUTHORIZED' },
        { status: 403, name: 'forbidden', type: 'FORBIDDEN' },
        { status: 404, name: 'notFound', type: 'NOT_FOUND' },
        { status: 500, name: 'system', system: 'SYSTEM' }
    ]

    responses.forEach((res) => {

        Response.macro(res.name, function (data, overrideStatus, message = null, type = null) {
            if (typeof overrideStatus === 'function') {
                return overrideStatus()
            }

            const status = overrideStatus || res.status;
            const result = _.find(responses, { status: status });
            type = type || result.type;
            switch (status) {
                case 200:
                    if (data) {
                        this.status(status).send({
                            status: res.status,
                            type: res.type,
                            message: 'successful',
                            data: data
                        });
                    } else {
                        this.status(status).send({
                            status: res.status,
                            type: res.type,
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
                            code: code,
                            message: message
                        }
                    });
                    break;
            }
        })
    })
})
