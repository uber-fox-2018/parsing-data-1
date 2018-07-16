"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name,last_name,email,phone,created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
}

class PersonParser {

  constructor(input) {

    const fs = require ('fs')
    const fileContent = fs.readFileSync(input,'utf8')
    let dataCsv = fileContent.split('\r')
    let dataCs = fileContent.split('\n')
    this._file = dataCs
    this._people = []
  }

  get people() {
    
    return this._people
  }

  addPerson(id, first_name,last_name,email,phone,created_at) {
    let convertTime = new Date (created_at)
    let person = new Person(id, first_name,last_name,email,phone,created_at)
    this.person(id, first_name,last_name,email,phone,convertTime)
    
  }

  execute (){
    let data = this._file
    let allData = []
    for (let i=1 ; i < data.length ; i++){
      allData.push(data[i].split(','))
    }
    
    
    for (let i=0 ; i < allData.length ; i++){
        let convertTime = new Date (allData[i][5])
        this.person(allData[i][0],allData[i][1],allData[i][2],allData[i][3],allData[i][4],convertTime)
    }
  }


  save () {
    const fs = require ('fs')
    let hasil = ''
    for (let i=0 ; i < this.people.length ; i++){
      hasil += this.people[i].id + ',' + this.people[i].first_name + ',' + this.people[i].last_name + ',' 
              + this.people[i].email + ',' + this.people[i].phone + ',' + this.people[i].created_at + '\n'
      
      
    } 
    
    fs.writeFileSync('people.csv',hasil)  
    
  }

  person (id, first_name,last_name,email,phone,created_at){
    let person = new Person(id, first_name,last_name,email,phone,created_at)
    this._people.push(person)

  }


}


//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)




let parser = new PersonParser ('./people.csv')
parser.execute()
parser.addPerson('201','Khodhi','Robbani','bandit@gmail.com','1-165-876-5519','2013-03-14T13:39:18-07:00')

// console.log(parser.people)
parser.save()