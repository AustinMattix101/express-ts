// let age: number = 20;
// if (age < 50)
//     age += 10;
// console.log(age);
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// let sales: number = 123_456_789;
// let course: string = "TypeScript";
// let is_published: boolean = true;
// let level;
// level = 1;
// level = "a";
// function render(doc: any) {
//     console.log(doc);
// }
// let numbers:number[] = [1, 2, 3];
// numbers.forEach(n => n)
// let any:any[] = []
// any[0] = "String"
// any[1] = 90;
// let user: [number, string] = [1, "Austin"];
// user.push(1); // Pls fixed this
// const small = 1;
// const medium = 2;
// const large = 3;
// PadcalCase
// enum Size { Small = 0, Medium, Large}; // default equal 0
// enum Size { Small = 1, Medium, Large}; // set equal 1
// const enum Size { Small = 's', Medium = 'm', Large = 'l'};
// let mySize: Size = Size.Medium;
// console.log(mySize);
// function calculateTax(income: number, TaxYear = 2022): number {
//     if ((TaxYear) < 2022)
//         return income * 1.2;
//     return income * 1.3;
// }
// calculateTax(10_000, 2023);
// function calculateTax(income: number, TaxYear?: number): number {
//     if ((TaxYear || 2022) < 2022)
//         return income * 1.2;
//     return income * 1.3;
// }
// calculateTax(10_000);
// let employee: {
//     id: number,
//     name: string,
// } = { id: 1 , name: ""};
// employee.name = "Austin";
// let employee: {
//     readonly id: number,
//     name?: string,
// } = { id: 1 };
// employee.name = "Austin";
// employee.id = 0;
// type Employee = {
//     readonly id: number,
//     name: string,
//     retire: (date : Date) => void
// }
// let employee: Employee = { 
//     id: 1, 
//     name: "Austin", 
//     retire: (date: Date) => {
//             console.log(date);
//         }
//     };
// function kgToLbs(weight: number | string): number {
//     // Narrowing
//     if (typeof weight === 'number')
//         return weight * 2.2;
//     else
//         return parseInt(weight) * 2.2;
// }
// kgToLbs(10);
// kgToLbs('10kg');
// type Draggable = {
//     drag: () => void
// };
// type Resizable = {
//     resize: () => void
// };
// type UIWidget = Draggable & Resizable;
// let textBox: UIWidget = {
//     drag: () => {},
//     resize: () => {},
// }
// // Literal (exact, specific)
// type Quantity = 50 | 100;
// let quantity: Quantity = 100;
// type Matric = 'cm' | 'inc';
// function greet(name: string | null | undefined) {
//     if (name)
//         console.log(name.toUpperCase());
//     else
//         console.log('Hola!');
// }
// greet(null); // valid JavaScripts
// greet(undefined); // valid JavaScripts
// type Customer = {
//     birthday?: Date
// };
// function getCustomer(id: number): Customer | null | undefined {
//     return id === 0 ? null : { birthday: new Date() };
// }
// let customer = getCustomer(0);
// // if (customer !== null && customer !== undefined)
// // Optional property access operator
//     console.log(customer?.birthday?.getFullYear());
// // Optional element access operator
// // if (customer !== null && customer !== undefined)
// //      customers[0];
// //      customers?.[0];
// // Optional call 
// // let log: any = (message: string) => console.log(message)
// let log: any = null
// log?.('a');
// Section II
// let a: string = "a";
// console.log('add', a );
// const getFullName = (name: string, surname: string): string => {
//     return name + '' + surname;
// }
// console.log(getFullName("Master", "Lessons"));
// type ID = string;
// type PopularTag = string;
// type MaybePopularTag = PopularTag | null;
// interface IUser {
//     id: ID;
//     name: string;
//     age?: number;
//     getMessage(): string;
// }
// const popularTags: PopularTag[] = ['dragon', 'coffee'];
// const dragonsTag: MaybePopularTag = 'dragon';
// const user: IUser = {
//     name: "Austin",
//     age: 20,
//     getMessage() {
//         return `Hello, ${this.name}`;
//     }
// }
// const user2: IUser = {
//     name: "Austin2",
//     getMessage() {
//         return "Hello, " + this.name;
//     }
// }
// console.log(user.getMessage());
// let username: string = "Austin";
// let pageNo: string | number = 1;
// let errorMessage: string | null = null;
// let user: IUser | null = null;
// let someProp: string | number | null | undefined | string[] | object[] | object;
// const doSomething = (): void => {
//     console.log('Do something!');
// };
// let v: void = null; // valid JS
// let v: void = undefined;
// v = "You"; // valid JS
// let any: any = "Any";
// console.log(any.bar()); // No Compile Error Occur Mostly used fot fetching data
// const doSomething = (): never => {
//     throw 'server';
// };
// let vAny: any = 10;
// let vUknown: unknown = 10;
// let s1: string = vAny;
// let s2: string = vUknown;
// console.log(vAny.getMessage());
// console.log(vUknown.getMessage());
// let vAny: any = 10;
// let vUknown: unknown = 10;
// let s1: string = vAny;
// let s2: string = vUknown as string;
// let pageNumber: string = "1";
// let numericPageNumber: number = (pageNumber as unknown) as number;
// let page: any = "1";
// let pageNumber = page as number;
// const someElement = document.querySelector('.mattix') as HTMLInputElement;
//     console.log('someElement', someElement.);
// const someElement = document.querySelector('.mattix');
// someElement?.addEventListener('blur', e => { 
//     const target = e.target as HTMLInputElement;
//     console.log('Event', target.value)
// });
// // Classes
// interface IUser {
//     getFullName(): string;
// }
// class User implements IUser {
//     protected firstName: string;
//     private lastName: string;
//     readonly unchangableName: string;
//     static readonly maxAge = 50;
//     constructor(firstName: string, lastName: string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.unchangableName = "Unchangable: " + firstName;
//     }
//     // ChangeUnchangableName(): void {
//     //     this.unchangableName = lastName;
//     // }
//     public getFullName(): string {
//         return this.firstName + ' ' + this.lastName
//     }
// }
// const user = new User('Austin', 'Mattix');
// console.log(user.getFullName());
// console.log(User.maxAge); // Static props
// class Admin extends User {
//     private editor: string;
//     setEditor(editor: string): void {
//         this.editor = editor;
//     }
//     getEditor(): string {
//         return this.editor;
//     }
//     constructor(editor: string, firstName: string, lastName: string) {
//         super(firstName, lastName);
//         this.editor = editor;
//     }
// }
// const admin = new Admin('Admin', 'Austin', 'Mattix');
// console.log(admin.getEditor());
// Generic Type
// const updatedArray = append<string>('Austin', ["Austin", "Mattix"]);
// const searchStr = "Austin";
// const _hasSearchString = any<string>((el: string) => el.contains(searchStr), [
//     'Austinnnn', 
//     'Mattix', 
//     'Camunited'
// ]);
var addId = function (obj) {
    var id = "".concat(Math.random().toString(16) + Date.now().toString(16)).split(".")[1];
    return __assign(__assign({}, obj), { id: id });
};
var user = {
    name: "Jack",
    data: {
        meta: "Meta"
    },
    meta: "META"
};
var user2 = {
    name: "John",
    data: ["Austin", "Mattix"],
    meta: "META"
};
var result = addId(user);
var result2 = addId(user2);
console.log("Result: ", result, result2);
// Enum
// const statuses = {
//     notStarted: 0,
//     inProgress: 1,
//     done: 2,
// }
// console.log(statuses.done);
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["NotStarted"] = "notStarted";
    StatusEnum["InProgress"] = "inProgress";
    StatusEnum["Done"] = "done";
})(StatusEnum || (StatusEnum = {}));
var notStartedStatus = StatusEnum.NotStarted;
notStartedStatus = StatusEnum.InProgress;
console.log(StatusEnum);
console.log(notStartedStatus);
