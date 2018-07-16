// "use strict"

class Person{
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(file){
    
  }
}

class PersonParser{

  constructor(file) {
    this._file = file
    this._people = this.people()
  }

  people() {
    var fs = require('fs')
    
    var res = []
    var orang = fs.readFileSync('people.csv').toString().split("\n")
    this._people = orang
    for(let i = 0 ; i < orang.length ; i++){
      orang[i] = orang[i].split(',')
    }
    for(let i = 0 ; i < orang.length ; i++){
      var obj = {}
      for(let j = 0 ; j < orang[i].length ; j++){
        if(obj[orang[i][j]] === undefined){
          obj[orang[0][0]] = Number(orang[i][0])
          obj[orang[0][1]] = orang[i][1]
          obj[orang[0][2]] = orang[i][2]
          obj[orang[0][3]] = orang[i][3]
          obj[orang[0][4]] = orang[i][4]
          obj[orang[0][5]] = orang[i][5] 
        }
      }
      res.push(obj)
    }
    // console.log(res)
    return res
  }

  addPerson(firstname,lastName,email,number,tanggal) {
    var tambah = {
      id: this._people.length,
      first_name: firstname,
      last_name: lastName,
      email: email,
      phone: number,
      created_at: tanggal
    }
    this._people.push(tambah)
    console.log('You just Added')
    console.log(this._people[this._people.length-1])
  }
  save(){
    var simpan = this._people
    for(let i = 0 ; i< simpan.length ; i++){
      simpan[i] = Object.values(simpan[i]).join(',')
    }
    simpan = simpan.join('\n')
    // console.log(simpan)
    var fs = require('fs')
    fs.writeFileSync('people.csv',simpan)
  }
}
// let person = new Person()

let parser = new PersonParser('people.csv')
var d = new Date()

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`

parser.addPerson('Minzard','Dillah','minzard.dillah@gmail.com','1-702-580-4785',d)
// parser.addPerson('Dillah','Minzard','minzard.dillah@gmail.com','1-702-580-4785','2012-02-22T10:09:03-08:00')  
// console.log(parser.people[201])
// parser.save()



