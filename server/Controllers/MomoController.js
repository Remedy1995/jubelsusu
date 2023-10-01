const https = require('https')
require('dotenv').config();
const ErrorResponse = require('../init/Response');
let payload = [];

const PayWithMomo = async (req, res) => {

    try {
        const { email, amount, phone } = req.body;
        const params = JSON.stringify({
            "amount": amount,
            "email": email,
            "currency": "GHS",
            "mobile_money": {
                "phone": phone,
                "provider": "mtn"
            }
        })

        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/charge',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.MOMO_SECRET}`,
                'Content-Type': 'application/json'
            }
        }

        const request = https.request(options, result => {
            let data = '';
            let referenceNumber = '';

            result.on('data', (chunk) => {
                data += chunk
            });

            result.on('end', () => {
                let dataObject = JSON.parse(data);
                referenceNumber += dataObject.data;
                console.log(JSON.parse(data))
                // console.log('transaction', dataObject.data.reference);
                // let reference = dataObject.data.reference;
                // let otp = 185339;


                // return { dataObject };
                return res.status(201).json(dataObject);
                // SubmitOtp(otp, reference).then((data) => {
                //     console.log('data', data);
                // });


                //let verify the status of our transaction
                //VerifyTransaction(dataObject.data.reference).then((verify) => {
                // const { data } = verify;
                //  console.log('info', data);

                //  })



            })


        }).on('error', error => {
            console.error(error)
        })

        request.write(params)
        request.end()
        console.log('my pay', payload);
    }
    catch (error) {
        const dbError = new ErrorResponse(500, " Error", error.message);
        return res.status(500).json(dbError.errorObject());
    }
}






const createReciepient = () => {

    const params = JSON.stringify({
        "type": "mobile_money",
        "name": "Tolu Robert",
        "account_number": "0502115942",
        "reference": "69753744-5e61-11ee-8c99-0242ac120002",
        "bank_code": "VOD",
        "currency": "GHS"
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transferrecipient',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.MOMO_SECRET}`,
            'Content-Type': 'application/json'
        }
    }

    const Hrequest = https.request(options, res => {
        let data = ''

        res.on('data', (chunk) => {
            data += chunk
        });

        res.on('end', () => {
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
    })

    Hrequest.write(params)
    Hrequest.end()
}


const GetBankInformation = () => {
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/bank',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.MOMO_SECRET}`
        }
    }

    https.request(options, res => {
        let data = ''

        res.on('data', (chunk) => {
            data += chunk
        });

        res.on('end', () => {
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
    })
}

const ListReciepient = () => {
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transferrecipient',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.MOMO_SECRET}`
        }
    }

    https.request(options, res => {
        let data = ''

        res.on('data', (chunk) => {
            data += chunk
        });

        res.on('end', () => {
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
    })
}

const CreateTransfer = () => {

    const params = JSON.stringify({
        "source": "balance",
        "reason": "Calm down",
        "amount": 100,
        "recipient": "RCP_n4fwqjmm0ei67we"
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transfer',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.MOMO_SECRET}`,
            'Content-Type': 'application/json'
        }
    }

    const Hrequest = https.request(options, res => {
        let data = ''

        res.on('data', (chunk) => {
            data += chunk
        });

        res.on('end', () => {
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
    })

    Hrequest.write(params)
    Hrequest.end();
}




//const Verification = (res, req) => {

// const  referenceCode  = req.body;
// const options = {
//     hostname: 'api.paystack.co',
//     port: 443,
//     path: `/transaction/verify/${referenceCode}`,
//     method: 'GET',
//     headers: {
//         Authorization: `Bearer ${process.env.MOMO_SECRET}`
//     }
// }


// const Hrequest = https.request(options, result => {
//     let data = ''

//     result.on('data', (chunk) => {
//         data += chunk
//     });

//     result.on('end', () => {
//         if (data !== '') {
//             return res.status(201).json(JSON.parse(data));
//         }

//     }).on('error', error => {
//         const dbError = new ErrorResponse(500, " Error", error.message);
//         return res.status(500).json(dbError.errorObject());
//     })
//     Hrequest.end()
// })
//  res.send("hello");
// console.log('re',req.body)
//}



























const SubmitOtp = (req, res) => {

    const { otp, reference } = req.body;
    const params = JSON.stringify({
        "otp": otp,
        "reference": reference
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/charge/submit_otp',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.MOMO_SECRET}`,
            'Content-Type': 'application/json'
        }
    }

    const request = https.request(options, result => {
        let data = ''

        result.on('data', (chunk) => {
            data += chunk
        });

        result.on('end', () => {
            console.log(JSON.parse(data));
            return res.status(201).json(JSON.parse(data));
        })
    }).on('error', error => {
        const dbError = new ErrorResponse(500, " Error", error.message);
        return res.status(500).json(dbError.errorObject());
    })

    request.write(params);
    request.end();
}



const Verification = (req, res) => {

    const { reference } = req.body;

    try {
        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: `/transaction/verify/${reference}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.MOMO_SECRET}`
            }
        }

        const request = https.request(options, result => {
            let data = ''

            result.on('data', (chunk) => {
                data += chunk
            });

            result.on('end', () => {
                console.log(JSON.parse(data))
                return res.status(201).json(JSON.parse(data));
            })
        }).on('error', error => {
            console.error(error)
            const dbError = new ErrorResponse(500, " Error", error.message);
            return res.status(500).json(dbError.errorObject());
        });
        request.end();
    
    } catch (error) {
        const dbError = new ErrorResponse(500, " Error", error.message);
        return res.status(500).json(dbError.errorObject());
    }
   
}








module.exports = { PayWithMomo, GetBankInformation, createReciepient, ListReciepient, CreateTransfer, Verification, SubmitOtp };