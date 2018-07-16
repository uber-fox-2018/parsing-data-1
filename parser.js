"use strict"
const fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date(created_at)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.dataPeople()
  }

  get file () {
    return this._file
  }

  set people (newPerson) {
    return this._people.push(newPerson)
  }

  dataPeople() {
    const data = fs.readFileSync(this.file, 'utf-8').split('\n')

    for (let i = 1; i < data.length; i++) {
      let currentLine = data[i].split(',')

      let id = currentLine[0]
      let first_name = currentLine[1]
      let last_name = currentLine[2]
      let email = currentLine[3]
      let phone = currentLine[4]
      let created_at = currentLine[5]

      var person = new Person (id, first_name, last_name, email, phone, created_at)
      this.people = person
    }
  }

  get people() {
    return {
      size: this._people.length,
      data: this._people
    }
  }

  addPerson(newPerson) {
    this.people = newPerson
  }

  save() {    
    let file = fs.readFileSync(this.file, 'utf-8').split('\n')
    let headers = file[0].split(',')
    let newData = ''
    for (let i = 0; i < this.people.data.length; i++) {
      newData += Object.values(this.people.data[i]).join(',') + '\n'
    }
    fs.writeFileSync(this.file, `${headers}\n${newData}`)
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person(`${parser.people.size + 1}`, 'Ari', 'Supriatna', 'arisupriatna703@gmail.com', '085777282844', new Date()))
parser.save()

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
