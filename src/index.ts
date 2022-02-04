interface Human {
    name: string;
    age: number;
    gender: string;
}

const person = {
    name: 'jisu',
    age: 32,
    gender: 'male',
};


const sayHi = (person: Human): void => {
    console.log(`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`);
};

console.log(sayHi(person));

export { };