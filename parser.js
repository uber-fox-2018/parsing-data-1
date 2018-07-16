"use strict"
const fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  // id,first_name,last_name,email,phone,created_at
  constructor(array){
    this.id         = array[0]
    this.first_name = array[1]
    this.last_name  = array[2]
    this.email      = array[3]
    this.phone      = array[4]
    this.created_at = array[5]
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  get file(){
    return this._file
  }

  get people() {
    return this._people
  }

  parse(){
    let data =  fs.readFileSync(this.file).toString().split('\n')
    for (let i = 0; i < data.length; i++) {
      let person = new Person(data[i].split(','))
      this.people.push(person)
    }
    return this.people
  }

  addPerson(id,first_name,last_name,email,phone) {
    let created_at = new Date()
    let person = new Person([id,first_name,last_name,email,phone,created_at])
    this.people.push(person)

    return this.people
  }

  save(){
    let newData = ''
    for (let i = 0; i < this.people.length; i++) {
      newData += `${this.people[i].id},${this.people[i].first_name},${this.people[i].last_name},${this.people[i].email},${this.people[i].phone},${this.people[i].created_at} \n`
    }
    fs.writeFileSync('people.csv',newData)
  }
}

let parser = new PersonParser('people.csv')
parser.parse()
parser.addPerson(201,'Wahyudi','Setiaji','wayudisetiaji@gmail.com','0858-1348-6177');
parser.save();



// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)