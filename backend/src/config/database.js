const MongoClient = require('mongodb').MongoClient
const uri = `mongodb+srv://superplayer:super123@cluster0.eafa5.mongodb.net/superplayer?retryWrites=true&w=majority`

/* CONEXÃO COM O BANCO DE DADOS MONGODB */
const connect = async () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
      if (err) {
        console.log(err)
        reject(err)
      }

      db = client.db('superplayer') // NOME DO BANCO DE DADOS
      console.log(`Connected MongoDB: ${uri}`);
      resolve(db)
    })
  })
}

module.exports = { connect }

