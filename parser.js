"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  // id,first_name,last_name,email,phone,created_at
  constructor(array){
    this.id = array[0]
    this.first_name = array[1]
    this.last_name = array[2]
    this.email = array[3]
    this.phone = array[4]
    this.creates_at = array[5]
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
  get file(){
    return this._file
  }

  parseData(){
    let fileData = fs.readFileSync(this._file,'utf8').split('\n')

    for(let i = 0 ; i<fileData.length ; i++){
      let person = new Person(fileData[i].split(','))
      this._people.push(person)

    }
    return this._people
  }

  addPerson(id,first_name,last_name,email,phone) {
    let created_at = new Date()
    let person = new Person([id,first_name,last_name,email,phone,created_at])
    this.people.push(person)

    return this._people
  }
  saveData(){
    let newPerson = ''
    for (let i = 0; i < this._people.length; i++) {
      newPerson += `${this._people[i].id},${this._people[i].first_name}, ${this._people[i].last_name}, ${this._people[i].email}, ${this._people[i].phone}, ${this._people[i].created_at} \n `
    }
    fs.writeFileSync('people.csv',newPerson)

  }

}

let parser = new PersonParser('people.csv')
parser.parseData()
parser.addPerson(203,'ming','cimz','cimiz@yahoo.com','0815-000-2900');
parser.saveData();


// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

//