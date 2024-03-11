const mongoose = require('mongoose')
require('dotenv').config()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URI).then(
    () => console.loh('Conectado ao MongoDB')
  ).catch(
    (err) => console.log(`Erro ao conectar com MongoDB: ${err}`)
  )
}