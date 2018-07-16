"use strict"

const fs = require('fs')

class Person {
  constructor (id, firstName, lastName, email, phone, createdAt){
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.phone = phone;
    this.created_at = createdAt;
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {
    return this._people;
  }

  get size (){
    return this._people.length;
  }

  get file (){
    return this._file
  }

  parseData(){
    var peopleArr = fs.readFileSync(this.file).toString().split('\n');
    peopleArr.shift();

    for (let i in peopleArr){
      let param = peopleArr[i].split(',');
      let person = new Person (param[0], param[1], param[2], param[3], param[4], param[5]);
      this.people.push(person);
    }
    return this.people;
  }

  addPerson(personObj) {
    return this.people.push(personObj);
  }

  save(){
    let mainStr = '';
    let keysStr = Object.keys(this.people[0]);
    mainStr += keysStr.join(',');

    
    for (let i in this.people){
      mainStr += `\n${this.people[i].id},${this.people[i].first_name},${this.people[i].last_name},${this.people[i].email},${this.people[i].phone},${this.people[i].created_at}`
    }
    fs.writeFileSync('people.csv', mainStr);
  }
}




let Brian = new Person (9999, 'Brian', 'Fury', 'g@mail.com', '081234567890', '2018-06-04T07:04:40-08:00')


let parser = new PersonParser('people.csv');
parser.parseData()
parser.addPerson(Brian)
console.log(parser.size)
parser.save()


// console.log(parser.addPerson(Brian))
// console.log(`There are ${parser.size} people in the file '${parser.file}'.`)