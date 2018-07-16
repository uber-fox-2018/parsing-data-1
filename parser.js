"use strict"

let fs = require('fs');

class Person {
  constructor(id, first_name, last_name, email, phone, create_at) {
    this.id =  id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.date = new Date(create_at);
  }

}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = [];
    this.readFile();
  }

  get people() {
    return this._people;
  }

  readFile() {
    let people = fs.readFileSync('./people.csv', 'utf8').split('\n');
    for(let i = 0; i < people.length; i++) {
      people[i] = people[i].split(',');
    }

    for(let i = 0; i < people.length; i++) {
      let newbie = new Person(people[i][0], people[i][1], people[i][2], people[i][3], people[i][4], people[i][5]);
      this.people = newbie;
    }

  }
  
  set people(obj) {
    this._people.push(obj);
  }

  addPerson(data) {
    this.people = data;
  }

  save() {
    
    let peopleData = this.people;
    // return peopleData
    let output = [];
    for(let i = 0; i < peopleData.length; i++) {
      let tmp = '';
      for(let j in peopleData[i]) {
        if(j !== 'date') {
          tmp += peopleData[i][j].toString().concat(',')
        } 
        else {
          tmp += peopleData[i][j].toString();
        }
        
      }
      // console.log(typeof tmp);
      
      output.push(tmp);
    }
    
    
    output = output.join('\n')
    let overwrite = fs.writeFileSync('./people.csv', output);
    
    // return typeof output

  }

}

let parser = new PersonParser('people.csv');

parser.addPerson(new Person(300, 'Joko', 'Susilo', 'joko@gmail.com', '081987654321', new Date()));

// console.log(parser.people);
console.log(parser.save())
// parser.save()



// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);