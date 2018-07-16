"use strict"

class Person {
  
  constructor(id,fname,lname,email,phone,createdAt) {
    this.id= id
    this.first_name= fname
    this.last_name= lname
    this.email= email
    this.phone= phone
    this.created_at= createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {

    for (var i= 0; i < file.length; i++) {
      let persons = file[i].split(',')
      let person = new Person(persons[0],persons[1],persons[2],persons[3],persons[4],persons[5])
      this._people.push(person)
    }
    return this._people.length
  }

  get file() {
    var source= 'people.csv'
    return source
  }

  

  addPerson() {}

}


var fs = require('fs')
var file = fs.readFileSync('people.csv','utf-8')
  .split("\n")
  .slice(1)

//console.log(people)

let parser = new PersonParser(file)

console.log(`There are ${parser.people} people in the file '${parser.file}'.`)
