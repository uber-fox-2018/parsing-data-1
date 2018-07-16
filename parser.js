"use strict"

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
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
    this._people = this.mergeData()
  }


  get people() {
    return this._people
    return this.mergeData()
  }

  joinData(){
    let data = this._file
    let personArr=[] 

    for (let i = 1 ; i < data.length ; i++){
      personArr.push(data[i].split(','))      
    }
    this.mergeData(personArr)
  }

  mergeData (arr){
    let arrMerge=[]
    console.log(arr)
    for (let i = 0 ; i < arr.length ; i++){
      for (let j = 0 ; j < arr[i].length ; j++){
        var obj = new Person(arr[j][0], arr[j][1], arr[j][2], arr[j][3], arr[j][4], arr[j][5])
        arrMerge.push(obj)
      }
    }
  }

  create (id, first_name, last_name, email, phone, created_at){
    let createData = new Person(id, first_name, last_name, email, phone. created_at)
    this._people.push(createData)
  }
}

const fs = require('fs')

const csv = fs.readFileSync('./people.csv')
  .toString()
  .split('\n')

let fileparser = new PersonParser('people.csv')
fileparser.create

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
