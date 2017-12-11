import {Checkout, Transaction} from './build/'

import convert from 'xml-js'


const t = new Transaction({
  email: 'pedroprado010@gmail.com',
  token: '5C242ED263CB405BB796F167F1117DD5',
  sandbox: true,
})
t.setReference(11111111)
let a = t.queryTransaction()
  .then(response => {
    let x  = convert.xml2json(response.data,{
      ignoreDeclaration: true,
      compact:true,
    })

    /*
    x = {
      date: x.transactionSearchResult.date._text,
      transaction: {
        date: x.transactionSearchResult.transactions.transaction.date._text,
        reference: x.transactionSearchResult.transactions.transaction.reference._text,
        code: x.transactionSearchResult.transactions.transaction.code._text,
        type: x.transactionSearchResult.transactions.transaction.type._text,
        status:  x.transactionSearchResult.transactions.transaction.status._text,
        paymentMethod:  {
          type: x.transactionSearchResult.transactions.transaction.paymentMethod.type._text,
        },
        grossAmount:  x.transactionSearchResult.transactions.transaction.grossAmount._text,
        discountAmount:  x.transactionSearchResult.transactions.transaction.discountAmount._text,
        feeAmount:  x.transactionSearchResult.transactions.transaction.feeAmount._text,
        netAmount:  x.transactionSearchResult.transactions.transaction.netAmount._text,
        extraAmount:  x.transactionSearchResult.transactions.transaction.extraAmount._text,
      },
      resultsInThisPage: x.transactionSearchResult.resultsInThisPage._text,
      currentPage: x.transactionSearchResult.currentPage._text,
      totalPages: x.transactionSearchResult.totalPages._text,
    }
    console.log(x);
  })
  .catch(error => {
    console.log(error.data);
  })


/*
const pagseguro = new Pagseguro({
  email: 'pedroprado010@gmail.com',
  token: '5C242ED263CB405BB796F167F1117DD5',
  sandbox: true,
})

pagseguro.setCurrency('BRL')
         .setReference('11111111')
         .setRedirectURL('http://localhost:3000/historic')
         .setNotificationURL('http://localhost:3000/notify')
         .setShipping({
            type: 3,
            address: {
              street: 'rua xyz',
              number: 10,
              city: 'uHGuSAHDusahd',
              complement: 'sala 10',
              district: 'centro',
              postalCode: '37500-300',
              country: 'BRA',
              state: 'MG',
            },
            cost: 10,
          })
         .addItem({
            id: 1,
            description: 'pexe',
            amount: '10.00',
            quantity: '1',
          })
         .setSender({
            name: 'bun da',
            email: 'aaa@gmail.com',
            phone: {
              areaCode: 55,
              number: 91159520,
            },
         })
         .send()
         .then(response => {
           console.log(response.data)
         })
         .catch(e => {
           console.log(e.response.data)
         })
*/
