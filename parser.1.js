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
    return this._people
  }

  persons(){
    var fs = require('fs')
    var people = fs.readFileSync(this._file,'utf-8')
      .split('\n')
      .slice(1)

    for (var i= 0; i < people.length; i++) {
      let persons = people[i].split(',')
      let person = new Person(persons[0],persons[1],persons[2],persons[3],persons[4],persons[5])
      this._people.push(person)
    }
    return this
  }

  addPerson() {}

}





let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
