class Human {
    public name: string;
    public age: number;
    public gender: string;

    // private 속성의 변수는
    // sayHi 함수처럼 인자를 통해서 변수에 접근 할 수 없다.
    private canNotUse: string;

    // 생성자 : 클래스로부터 객채를 만들 때 마다 실행되는 메소드
    constructor(name: string, age: number, gender: string, canNotUse?: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.canNotUse = canNotUse;
    }   
}

const jisu = new Human("jisu", 32, "male");


const sayHi = (person: Human): void => {
    console.log(`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`);
};

console.log(sayHi(jisu));

export { };