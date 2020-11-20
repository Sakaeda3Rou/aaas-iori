const name = null;
const age = null;

const user = {
  name: name,
  age: age
}

// setter
const setUser = (name, age) => {
  this.name = name;
  this.age = age;
}

const setName = (name) => {
  this.name = name;
}

const setAge = (age) => {
  this.age = age;
}


// getter
const getName = () => {
  return this.name;
}

const getAge = () => {
  return this.age;
}

module.exports = {
  setUser,
  setName,
  setAge,
  getName,
  getAge
};
