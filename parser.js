"use strict"

class Person {
  //id,first_name,last_name,email,phone,created_at
  constructor(id = 0, fname = '', lname = '', email = '', phone = '', createdAt = '') {
    this.id = id;
    this.first_name = fname;
    this.last_name = lname;
    this.email = email;
    this.phone = phone;
    this.created_at = createdAt.length === 0 ? new Date() : new Date(createdAt);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
    this._delimeter = '\r\n';

    this._parseToPersons();
  }

  _parseToPersons() {
    this._people = [];
    const fs = require('fs');
    let fileContent = fs.readFileSync(this._file, 'utf8');
    let peopleArr = fileContent.split(this._delimeter);
    let row;
    for (let i = 1; i < peopleArr.length; i++) {
      row = peopleArr[i].split(',');
      this._people.push(new Person(row[0], row[1], row[2], row[3], row[4], row[5]));
    }
  }

  _parseToString() {
    let person, row, bufferString = [];
    bufferString.push('id,first_name,last_name,email,phone,created_at');
    for(let i = 0; i < this._people.length; i++) {
      person = this._people[i];
      row = [
        person.id,
        person.first_name,
        person.last_name,
        person.email,
        person.phone,
        person.created_at
      ];
      bufferString.push(row.join(','));
    }
    return bufferString.join(this._delimeter);
  }

  get file() {
    return this._file;
  }

  get people() {
    return this._people;
  }

  addPerson(person) { 
    this.people.push(person);
  }

  save() {
    let bufferString = this._parseToString();
    const fs = require('fs');
    fs.writeFileSync(this.file, bufferString);
  }

  setDelimeter(delimeter) {
    this._delimeter = delimeter;
  }

}

let parser = new PersonParser('people.csv')
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

console.log(`Add new person to ${parser.file}`);
let person = new Person(300, 'Arthur', 'Pendragon', 'kingarthur@camelot.com', '1-234-567-8900')
parser.addPerson(person);
parser.save();

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
console.log(parser.people[parser.people.length-1]);