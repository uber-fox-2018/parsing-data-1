"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, created_at) {
    this._id = id
    this._first_name = firstName
    this._last_name = lastName
    this._email = email
    this._phone = phone
    this._created_at = created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people =  []
  }

  set people(data) {
    let parsingCsv = fs.readFileSync(this._file, 'utf-8')
    let splitCsv = parsingCsv.split('\n')
    for(let i = 0; i < splitCsv.length; i++) {
      let splitArr = splitCsv[i].split(',')
      let id = splitArr[0]
      let firstName = splitArr[1]
      let lastName = splitArr[2]
      let email = splitArr[3]
      let phone = splitArr[4]
      let created_at = splitArr[5]
      let person = new Person(id, firstName, lastName, email, phone, created_at)
      this._people.push(person)
    }
    return this._people
  }

  get people() {
    return this._people
  }

  addPerson(person) {
    let dataPeople = this._people
    dataPeople.push(person)
  }

  save() {
    let dataPeoples = this._people
    let containStr = ''
    for(let i = 0; i < dataPeoples.length; i++) {
      // console.log(dataPeoples[i]);
      let resultArr = []
      for(let key in dataPeoples[i]) {
        resultArr.push(dataPeoples[i][key])
      }
      containStr += resultArr.join(',') + '\n'
    }
    fs.writeFileSync('people.csv', containStr)
  }
}

let parser = new PersonParser('people.csv')
parser.people = ''
parser.addPerson(new Person('202', 'Fajar', 'TC', 'fajar@mail.com', '1-232-342-2444', '2013-11-01T06:08:44-07:00'))

console.log(parser.people);
parser.save()


// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
