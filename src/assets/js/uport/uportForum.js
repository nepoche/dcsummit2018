  import { Connect, SimpleSigner } from 'uport-connect'

    const uport = new Connect('Government DCCode2018', {
      clientId: '2ogKKcvo2oVJHuk6Tby8vkEq64K2do9afig',
      network: 'rinkeby or ropsten or kovan',
      signer: SimpleSigner('SIGNING KEY')
    })

    // Request credentials to login
    uport.requestCredentials({
      requested: ['name', 'phone', 'country'],
      notifications: true // We want this if we want to recieve credentials
    })
    .then((credentials) => {
      // Do something
    })

    // Attest specific credentials
    uport.attestCredentials({
      sub: THE_RECEIVING_UPORT_ADDRESS,
      claim: {
        CREDENTIAL_NAME: CREDENTIAL_VALUE
      },
      exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    })