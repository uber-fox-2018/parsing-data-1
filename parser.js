"use strict"
var fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, fname, lname, email, phone, accCreated) {
    this.id = id
    this.fname = fname
    this.lname = lname
    this.email = email
    this.phone = phone
    this.accCreated = accCreated
  }
  
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = []
  }

  generatePpl(data) {
    for (let i = 0; i < data.length; i++) {
      let temp = data[i].split(',')
      let person = new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],)
      this._people.push(person)
    }
    return this._people
  }

  get people() {
    return this._people
  }

  set people(obj) {
    this._people.push(obj)
  }

  addPerson(id, fname, lname, email, phone, accCreated) {
    var person = new Person(id, fname, lname, email, phone, accCreated)
    this._people.push(person)
    return this._people[200]
  }

  get size() {
    return this.people.length
  }

  get file() {
    return this.readData().length
  }

  readData() {
    var csv = fs.readFileSync(this._file,'utf8')
    .toString()
    .split('\n')
    .slice(1)
    return csv
  }

  save() {
    let res = []
    let temp = []
    for (let i = 0 ; i < this._people.length; i++) {
      for (var key in this._people[i]) {
        temp.push(this._people[i][key]) 
      }
      res.push(temp)
      temp = []
    }
    console.log(res)
    fs.writeFileSync(this._file,(res.join('\n')))
  }
  
}

let parser = new PersonParser('people.csv')
let generateData = parser.readData()
parser.generatePpl(generateData)
parser.addPerson(0,'gusti','budi','hahah@gmail.com','1-235-245-3072','2013-12-02T06:45:30-08:00')
console.log(`There are ${parser.size} people in the file '${parser.file}'.`)
parser.save()
