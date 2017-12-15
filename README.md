# pagsegurojs

Integração da API de pagamento PagSeguro com Nodejs

## Instalação

```
npm install pagsegurojs --save
```

## Funcionalidades

- [Checkout](#checkout)
- [Transaction](#transaction)

## Checkout

O checkout retorna o código que representa a transação no pagseguro. Pode ser usado em [pagamento padrão](https://dev.pagseguro.uol.com.br/documentacao/pagamento-online/pagamentos/pagamento-padrao) ou em [pagamento lightbox](https://dev.pagseguro.uol.com.br/documentacao/pagamento-online/pagamentos/pagamento-lightbox).

### Exemplo

```javascript
import { Checkout } from 'pagsegurojs'

const checkout = new Checkout({
  email: 'exemplo@email.com',
  token: 'XXXXXXXXXXXXXXXXX',
  sandbox: true,
})

checkout.setCurrency('BRL')
  .setReference('REF00001')
  .addItem({
    id: '00001',
    description: 'Produto exemplo',
    amount: 1.99,
    quantity: 4,
    weight: 2,
    shippingCost: 5.15 ,
  })
  .setSender({
    name: 'cliente da loja',
    email: 'cliente@loja.com',
    phone: {
      areaCode: 35,
      number: 991234567,
    },
    ip: '192.168.0.100',
    documents: [
      {
        document: {
          type: 'CPF',
          value: '11111111111',
        },
      },
    ],
  })
  .setShipping({
    type: 1, // PAC
    cost: 20.55,
    addressRequired: false,
  })
  .setRedirectURL('https://lojaexemplo.com.br/shop')
  .setNotificationURL('https://lojaexemplo.com.br/notify')
  .send()
  .then((r)=>console.log(r.data))

/*
 * <?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
 * <checkout>
 *   <code>XXXXXXXXXXXXXXXXXXXXXXXXXXXX</code>
 *   <date>XXXX-XX-XXXXX:XX:XX.XXXX-XX:XX</date>
 * </checkout>
 */
```

## Transaction

Consulta o status da transação. A versão atual possui apenas consulta por [reference](https://dev.pagseguro.uol.com.br/documentacao/pagamento-online/pagamentos/consultando-por-codigo-de-referencia). *valor definido por `setReference` no checkout*

### Exemplo
```javascript
import { Transaction } from 'pagsegurojs'
const transaction = new Transaction({
  email: 'exemplo@email.com',
  token: 'XXXXXXXXXXXXXXXXX',
  sandbox: true,
})


transaction.setReference('REF00001')
  .queryTransaction()
  .then((r) => console.log(r.data))

/*
 *  <?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
 *  <transactionSearchResult>
 *    <date>0000-00-00000:00:00.000-00:00</date>
 *      <transactions>
 *        <transaction>
 *          <date>0000-00-00000:00:00.000-00:00</date>
 *          <reference>REF00001</reference>
 *          <code>FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF</code>
 *          <type>1</type>
 *          <status>3</status>
 *          <paymentMethod>
 *            <type>1</type>
 *          </paymentMethod>
 *          <grossAmount>30.00</grossAmount>
 *          <discountAmount>0.00</discountAmount>
 *          <feeAmount>10.00</feeAmount>
 *          <netAmount>20.00</netAmount>
 *          <extraAmount>0.00</extraAmount>
 *          <lastEventDate>0000-00-00000:00:00.000-00:00</lastEventDate>
 *        </transaction>
 *      </transactions>
 *      <resultsInThisPage>1</resultsInThisPage>
 *      <currentPage>1</currentPage>
 *      <totalPages>1</totalPages>
 *  </transactionSearchResult>
 */
```
