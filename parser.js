"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor( id, first_name, last_name, email, phone, created_at) {
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
    this._people = null
    this._people = this.callPeople()
  }

  callPeople() {
    let category = []
    var people = fs.readFileSync('people.csv').toString().split('\n')
    //let people_split = []
    for (let i = 0; i < people.length; i ++) {
      let people_split = people[i].split(',')
      let id = people_split[0] 
      let first_name = people_split[1]
      let last_name = people_split[2]
      let email = people_split[3]
      let phone = people_split[4]
      let created_at = people_split[5]

      let people_split_obj = new Person(id,first_name,last_name,email,phone,created_at)

      category.push(people_split_obj)
    }
    return category
  }

  get people() {
    return this._people
  }

  addPerson(category) {
    return this._people.push(category)
  }

  save() {
    let dataPerson = ''
    for (let i = 0; i < this._people.length;i++) {
      let arrSave = []
      for (var key in this._people[i]) {
        arrSave.push(this._people[i][key])
      }
      dataPerson += arrSave.join(',') + '\n'
    }
    fs.writeFileSync(this._file,dataPerson)
  }

}

let fs = require ('fs')
let parser = new PersonParser('people.csv')

parser.callPeople()
parser.addPerson(new Person('201', 'Tyler', 'Durden', 'durden@hotwheels.com', '1-111-666-666', '2018-04-01T06:09.00'))
//console.log(parser.people.length)
parser.save()
//console.log(category)
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
