"use strict"
let fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, date){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.date = date
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  set people(person) {
    this._people.push(person)
  }

  get people() {
    return this._people;
  }

  readFile(){
    let data = fs.readFileSync(this._file,'utf8')
    return data
  }

  parserData(data){
    let rows = data.split("\n")
    for (let i = 0; i < rows.length; i++){
      let attr = rows[i].split(",")
      let date = new Date (attr[5])
      let person = new Person(attr[0], attr[1], attr[2], attr[3], attr[4], date)
      this.people = person
    }
  }


  addPerson(id, first_name, last_name, email, phone, date) {
    let person = new Person(id, first_name, last_name, email, phone, date)
    this.people = person
  }

  save(){
    let people = parser.people
    let str = ''
    for (let i = 0; i < people.length; i++){
      str += people[i].id +','+ people[i].first_name +','+ people[i].last_name +','+ people[i].email +','+ people[i].phone +','+ people[i].date + '\n'
    }
    fs.writeFileSync('people.csv',str)
  }
}

let parser = new PersonParser('people.csv')
let data = parser.readFile();
parser.parserData(data)
parser.addPerson('201','Windra', 'Pratama', 'asd@dsa.com', '432423424', '2018-11-01T13:08:44.000Z')
parser.save()


