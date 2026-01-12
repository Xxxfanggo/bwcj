export interface Person {
  name: string;
  age: number;
  id?: number;
}

// 写法1
export type Persons = Array<Person>;
// 写法2
// export type Persons = Person[];