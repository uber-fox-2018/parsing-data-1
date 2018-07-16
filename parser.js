"use strict"
var fs = require('fs')

class Person{
  // id,first_name,last_name,email,phone,created_at
  constructor(id, first_name, last_name, email, phone, created_at ){
    this._id = id
    this._firstName = first_name
    this._lastName = last_name
    this._email = email
    this._phone = phone
    this._created_at = new Date(created_at)
  }
}

class PersonParser{

  constructor(file) {
    this._file = file
    this._people = []
  }

  set people(obj){
    this._people.push(obj)
  }
  
  get people(){
    return this._people
  }

  readData(){
    var parsingData = fs.readFileSync('people.csv', 'utf8').split('\n')
    console.log(parsingData);
    
    for(var i = 0; i < parsingData.length;i++){
      var dataPerson = parsingData[i].split(',')
      var id = dataPerson[0]
      var first_name = dataPerson[1]
      var last_name = dataPerson[2]
      var email = dataPerson[3]
      var phone = dataPerson[4]
      var created_at = dataPerson[5]
      var newPerson = new Person(id, first_name, last_name, email, phone, created_at)
      this.people = newPerson
    }
    
  }

  addData(newComer){
    this.people = newComer
  }


  save(){
    var str = ''
    for(var i = 0; i < this._people.length;i++){
      var temp = []
      for(var key in this._people[i]){
        temp.push(this._people[i][key])
      }
      str += temp.join(',')+('\n')
    }

    fs.writeFileSync('people.csv',str)
  }
}



let parser = new PersonParser('people.csv')
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// parser.people = ''
console.log(parser.readData());

// var newComer = new Person('202','imam','nahrawi','imam@mail.com','0897654321',new Date())
// parser.addData(newComer)
// parser.save()

// console.log(parser.people);
