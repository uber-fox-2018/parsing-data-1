"use strict"

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.dataList = this.readCSV()
    // this.arrDataForm = people
  }

  data () {

    // let container = [];
    // splt[1].split(',')
    // let attrs = null

    // for (let i = 1; i < splt.length; i++) {
    //   var attrs = this.dataList.push(splt[i].split(','))
    //   // console.log(this.dataList)
    //   var person = new Person(attrs[0], attrs[1], attrs[2], attrs[3], attrs[4], attrs[5])
    //   this._people.push(person)
      // attrs = null
      // console.log(container);
      // let noComma = container.split(',')
      // this.dataList.push(container)
      // container = []
    // }
    // console.log(this.dataList);
    // return this._people
  }

  readCSV () {
    let data = fs.readFileSync('people.csv', 'utf8')
    // console.log(data)
    let splt = data.split('\r\n');
    return splt
  }

  get people() {
    let container = [];
    for (let i = 0; i < this.dataList.length; i++) {
      container.push(this.dataList[i].split(','))
      var person = new Person(container[i][0], container[i][1], container[i][2], container[i][3], container[i][4], container[i][5])
      this._people.push(person)
      // console.log(person)
    }
    // return attrs

    return this._people
  }

  addPerson(data) {
    this.people = data;
  }

}


const fs = require ('fs');
// let fileContent = fs.readFileSync('people.csv', 'utf8')
//                   .toString()
//                   .split("\n")

let parser = new PersonParser('people.csv');
let dataFile = parser.readCSV();
parser.data(dataFile);
// console.log(parser.people);
// console.log(parser.readCSV())
// parser.addPerson(new Person(201, 'Riadji', 'Ramadhan', 'riadji.ramadhan@mail.com', '0857656272', '2013-12-01T06:09:'));
console.log(parser.people)

// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
