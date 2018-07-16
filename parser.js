"use strict"
 
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.create = created_at
  }
}
 
class PersonParser {
 
   constructor(file) {
    this._file = file
    this._people = this.objectPerson()
   }
 
   get people() {
    return this._people
    return this.length
  } 
 
  convertToArray() {
    let data = this._file
    let arrData = []
    let splitData = data.split('\n')

    for(let i=1;i<splitData.length;i++){
      let personData = splitData[i].split(',')
      arrData.push(personData)
    }
    
    return arrData
  }

  objectPerson(){
    let arr = this.convertToArray()
    let arrPerson = []
    for(let i=0;i<arr.length;i++){
      let obj = new Person(arr[i][0],arr[i][1],arr[i][2],arr[i][3],
                           arr[i][4],arr[i][5])
      arrPerson.push(obj)
    }
      return arrPerson
  }

  addPerson(id,first_name,last_name,email,phone){
    let data = new Person(id,first_name,last_name,email,phone,new Date)
    this._people.push(data) 
  }

  saveDataPerson(){
    let convert = this.arrToString()
    let saveData = fs.writeFileSync('people.csv',convert)
    
  }

  convertObjToArr(){
    let objPeople = this._people
    let str =''
    let arr =[]
    for(let i=0;i<objPeople.length;i++){
        let tempt =[]
      for(let j in objPeople[i]){   
          tempt.push(objPeople[i][j])
      }
    arr.push(tempt)
    }
    arr.unshift(['id','first_name','last_name','email','phone','created_at'])
    return arr
  }

  arrToString(){
    let arr = this.convertObjToArr()
    let newArr = []
    for(let i=0;i<arr.length;i++){
      let data = arr[i].join(',')
      newArr.push(data)
    }
    return newArr.join('\n')
  }
 
 }
 
const fs = require('fs')
let fileCSV = fs.readFileSync('./people.csv', 'UTF-8')
    .toString()

let parser = new PersonParser(fileCSV)
 
parser.addPerson(201,'harles','bayu','harles@mail.com','920-12312')
parser.addPerson(202,'bayu','anggara','anggara@mail.com','920-12312')
parser.saveDataPerson()

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)