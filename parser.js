"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
    constructor(id,firstName,lastName,email,phone,createdAt){
        this._id = id;
        this._first_name = firstName;
        this._last_name = lastName;
        this._email = email;
        this._phone = phone;
        this._created_At = createdAt;
      }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.parse()
  }

  get file(){
    return this._file
  }


  get people() {
    let dataPeople = {
      size: this.parse().length,
      detail: this.parse()
    }
    
    return dataPeople
  }

  addPerson(newPerson) {
    return this._people.push(newPerson)
  }

  parse(){
    let dataString = fs.readFileSync(this._file,'utf8');
    let dataArrPeople = dataString.split('\n');
    let resultData=[]
    for(let i =1; i<dataArrPeople.length;i++){
      let personData = dataArrPeople[i].split(',')
      let personObj = new Person(personData[0],personData[1],personData[2],personData[3],personData[4],personData[5])
      resultData.push(personObj)
    }
    return resultData
  }

  save(){
    // console.log(this._people[0]['_id']);
    let stringCsv = '';
    for(let i = 0; i<this._people.length; i++){
      // console.log(this._people[i])
      for(var key in this._people[i]){
        // console.log(this.people[i][j])
        stringCsv = stringCsv + this._people[i][key] +','
      }
      stringCsv+='\n'
    }
    fs.writeFileSync('people.csv',stringCsv)
  }

}

let parser = new PersonParser('people.csv')
let jokowi = new Person('201','Joko','Widodo','jokowi@mail.com','0897-6543-0987','2018-07-16')

// parser.addPerson(jokowi)
// parser.save()
console.log(parser.parse()[199]);

// console.log(parser.people.size)
// console.log(parser.file)





console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
