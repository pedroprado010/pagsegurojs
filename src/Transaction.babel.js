import convert from 'xml-js'
import axios from 'axios'

export class Transaction {
  constructor({email, token, sandbox = false}) {
    this.email = email
    this.token = token
    this.link = sandbox ?
      'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?':
      'https://ws.pagseguro.uol.com.br/v2/transactions?'
  }

  setReference(ref) {
    this.reference = ref
    return this
  }

  queryTransaction() {
    if (this.reference) {
      this.link += `email=${this.email}&token=${this.token}&reference=${this.reference}`
    } else {
      throw new Error('No transaction reference set')
    }
    return axios({method: 'GET', url: this.link})
  }
}
