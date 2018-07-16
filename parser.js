"use strict"

class Person {
  constructor(id, fname, lname, email, phone, createdAt= new Date()){
    this.id = id
    this.first_name = fname
    this.last_name = lname
    this.email = email
    this.phone = phone
    this.created_at = new Date (createdAt)
  }
}

class PersonParser {
  constructor(filename) {
    this.file = filename
    this.title = lists.split("\n").slice(0,1);
    this._file = lists;
    this.people = null;
    this.length = 0;
  }
  
  set people(file){
    let files = this._file.split("\n").slice(1);
    let arr =[];
    for(let file of files){
      let individu = file.split(",");
      let orang = new Person (individu[0],individu[1],individu[2],individu[3],individu[4],individu[5])
      arr.push(orang);
    }
    this._people = arr;
  }

  get people() {
    return this._people
  }
  
  get size(){
    return this._people.length;
  }

  addPerson(personObj){
    personObj.id = this.size + 1;
    this._people.push(personObj);
    return this._people;
  }

  save(){
    let result=[this.title];
    for(let person of this.people){
      console.log(person)
      let box = [];
      for(var key in person){
        box.push(person[key]);
      }
      result.push(box);
      box=[];
    }
    
    fs.writeFileSync(this.file,(result.join('\n')));
  }
}

const fs = require ('fs');
let lists = fs.readFileSync('./people.csv', 'utf8');
let parser = new PersonParser('people.csv');
parser.people;
parser.addPerson(new Person(null,'Susan','Nio','susan@gmail.com','888888', new Date()));
console.log(parser.people); 
console.log(`There are ${parser.size} people in the file '${parser.file}'.`)
parser.save();


