"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {
    return {people: this._people, size: this._people.length};
  }

  get file() {
    return this._file;
  }

  parseData() {
    let details = fs.readFileSync('people.csv').toString().split('\n');
    for (let i = 1; i < details.length; i++) {
      let dataArr = details[i].split(',');
      var id = dataArr[0];
      var first_name = dataArr[1];
      var last_name = dataArr[2];
      var email = dataArr[3];
      var phone = dataArr[4];
      var created_at = dataArr[5];

      let person = new Person(id, first_name, last_name, email, phone, created_at);
      this._people.push(person);
    }
    return this._people;
  }
  addPerson(input) {
    this._people.push(input);
  }

  saveEntry() {
    let strArr = [];
    for (let i = 0; i < this._people.length; i++) {
      let outputArr = [];
      for (let key in this._people[i]) {
        outputArr.push(this._people[i][key])
      }
      strArr.push(outputArr.join(',') + '\n');
    }
    fs.writeFileSync('people.csv', strArr.join(''), 'utf8');
    return this._people;
  }
}

let parser = new PersonParser('people.csv');
const fs = require('fs');
parser.parseData();
let newId = parser.people.size + 1;
parser.addPerson(new Person(newId, 'Sue', 'Mae', 'masu@mail.com', '1-357-913-5791', '2018-07-16T14:35:47-07:00'));
parser.saveEntry();

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
