"use strict";

const fs = require("fs");

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = [];
  }

  personParser() {
    let arr = [];
    let peoples = fs
      .readFileSync(this._file)
      .toString()
      .split("\n");
    for (let i = 0; i < peoples.length - 1; i++) {
      arr.push(peoples[i].split(","));
    }
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      const id = arr[i][0];
      const first_name = arr[i][1];
      const last_name = arr[i][2];
      const email = arr[i][3];
      const phone = arr[i][4];
      const created_at = arr[i][5];

      this._people.push(
        new Person(
          id,
          first_name,
          last_name,
          email,
          phone,
          created_at,
          new Date()
        )
      );
    }

    return this._people;
  }
  get file() {
    return this._file;
  }

  get people() {
    return { size: this._people.length };
  }

  addtoFile(people) {
    this._people.push(people);
  }

  save() {
    let str = " ";
    for (let i = 0; i < this._people.length; i++) {
      str += this._people[i].id + ",";
      str += this._people[i].first_name + ",";
      str += this._people[i].last_name + ",";
      str += this._people[i].email + ",";
      str += this._people[i].phone + ",";
      str += this._people[i].created_at + "\n";
    }

    fs.writeFileSync(this._file, str);
  }
}

let parser = new PersonParser("people.csv");
parser.personParser();

let ade = new Person(
  parser.people.size,
  "ade",
  "fahri",
  "adefahri@gmail.com",
  3389492890,
  new Date()
);
console.log(
  `There are ${parser.people.size} people in the file '${parser._file}'.`
);
parser.addtoFile(ade);
parser.save();
