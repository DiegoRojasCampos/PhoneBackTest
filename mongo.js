const mongoose = require('mongoose')

// if (process.argv.length < 5) {
//   console.log("There are missing arguments")
//   process.exit(1)
// }

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://BackTest:${password}@backtest.hhtld7m.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=BackTest`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

if (process.argv.length === 3) {
  console.log("Phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}else if (process.argv.length === 5) {
  person.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
  })
}

// person.save().then(result => {
//   console.log(`added ${result.name} number ${result.number} to phonebook`)
//   mongoose.connection.close()
// })

// Person.find({}).then(result => {
//   console.log("Phonebook:")
//   result.forEach(person => {
//     console.log(`${person.name} ${person.number}`)
//   })
//   mongoose.connection.close()
// })