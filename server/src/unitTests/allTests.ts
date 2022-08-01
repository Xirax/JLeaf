import solutionManagerTest from "./solutionManagerTest";
import projectSolutionTest from "./projectSolutionTest";
import categoriesStorageTest from './categoriesStorageTest';
import categoryTest from './categoryTest';
import taskTest from './taskTest';
import singleUIDGenerator from './UniqueIDGeneratorTest';
import taskStorageTest from './taskStorageTest';

solutionManagerTest();

console.log('\n -------------------------------- ');

projectSolutionTest();

console.log('\n -------------------------------- ');

categoriesStorageTest();

console.log('\n -------------------------------- ');

categoryTest();

console.log('\n -------------------------------- ');

singleUIDGenerator(150);

console.log('\n -------------------------------- ');

taskTest();

console.log('\n -------------------------------- ');

taskStorageTest();