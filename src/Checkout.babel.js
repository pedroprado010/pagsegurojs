import convert from 'xml-js'
import axios from 'axios'

export class Checkout {
  data = {items: []}
  xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'

  constructor({email, token, sandbox = false}) {
    this.email = email
    this.token = token
    this.sandbox = sandbox
  }

  setCurrency(currency='BRL') {
    this.data.currency = currency
    return this
  }

  setReference(reference) {
    this.data.reference = reference
    return this
  }

  addItem(item) {
    this.data.items.push({item})
    return this
  }

  setSender(sender) {
    this.data.sender = {...sender}
    return this
  }

  setShipping(shipping) {
    this.data.shipping = {...shipping}
    return this
  }

  setRedirectURL(url) {
    this.data.redirectURL = url
    return this
  }

  setNotificationURL(url) {
    this.data.notificationURL = url
    return this
  }

  send() {
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
      },
    }
    const options = {compact: true}

    config.url = this.sandbox ?
                 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=' :
                 'https://ws.pagseguro.uol.com.br/v2/checkout?email='
    config.url += this.email + '&token=' + this.token
    config.data = this.xml + convert.js2xml({checkout: this.data},options)
    console.log(config.url);
    console.log(this.xml + convert.js2xml({checkout: this.data},options))

    return axios(config)
  }
}
