console.log("Lecture-03 __ learn 01--> json and object")

// from json to object
// let jsonData='{"name":"Dheeraj","age":24,"Hobbies":["Programming","Sports","Travelling"] } '
// let objectData=JSON.parse(jsonData)
// console.log(objectData)

// from object to json 
let objectData={
    name:"Dheeraj",
    age:24,
   Hobbies:["coding","sports"]
}

let jsonData= JSON.stringify(objectData)
console.log(jsonData)
console.log(typeof(jsonData))
console.log(typeof(objectData))