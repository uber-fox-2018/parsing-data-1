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
      //console.log(persons)
      var person = new Person (persons[0],persons[1],persons[2],persons[3],persons[4],persons[5])
      //console.log(person)
      this._people.push(person)
      
    }
    this.addPerson()
    //console.log (this._people)
    this.saveFile()
    return this._people.length  
  }

  get file() {
    var source= 'people.csv'
    return source
  }

  addPerson() {
    var additional= new Person ('201', 'Andry' , 'JNS', 'andry@nps.com', '1-222-333-4444', '2018-07-16T12:06:16-07:00\r')
    this._people.push(additional)
  
  }

  saveFile() {
    
    var result=[]

    for (var i=0; i<this._people.length; i++) {
      var stepFirst=[]

      for (var prop in this._people[i]) {
        stepFirst.push(this._people[i][prop])
      }
      result.push(stepFirst)

    }
    console.log(result)
    fs.writeFileSync(this.file,(result.join('\n')))

  }

}


var fs = require('fs')
var file = fs.readFileSync('people.csv','utf-8')
  .split("\n")
  .slice(1)


let parser = new PersonParser(file)
console.log(`There are ${parser.people} people in the file '${parser.file}'.`)

//---