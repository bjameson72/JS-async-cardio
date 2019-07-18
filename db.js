const fs = require("fs").promises;
/*
All of your functions must return a promise!
*/

/* 
Every function should be logged with a timestamp.
If the function logs data, then put that data into the log
ex after running get('user.json', 'email'):
  sroberts@talentpath.com 1563221866619

If the function just completes an operation, then mention that
ex after running delete('user.json'):
  user.json succesfully delete 1563221866619

Errors should also be logged (preferably in a human-readable format)
*/

/**
 * Logs the value of object[key]
 * @param {string} file
 * @param {string} key
 */
function get(file, key) {
  // 1. read file
  // 2. handle promise -> data
  // return fs.readFile(file, "utf8").then(data => {
  //   const parsed = JSON.parse(data);
  //   // 4. use the key to get the value at object (key)
  //   const value = parsed(key);
  //   // 5. append the log file with the above value
  //   return log(value);
  return fs
    .readFile(`./${file}`, "utf8")
    .then(data => fs.appendFile("./log.txt", `${JSON.stringify(data[key])} ${Date.now()}\n`))
    .catch(err => fs.appendFile("./log.txt", `error reading file ${file} ${Date.now()}\n`));
}

/**
 * Sets the value of object[key] and rewrites object to file
 * @param {string} file
 * @param {string} key
 * @param {string} value
 */
async function set(file, key, value) {
  // return fs
  //   .readFile(`./${file}`, "utf8")
  //   .then(data => fs.appendFile("./log.txt", `${JSON.stringify(data[key])} ${Date.now()}\n`))
  //   .catch(err => fs.appendFile("./log.txt", `error reading file ${file} ${Date.now()}\n`));
  try {
    const data = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(data);
    parsed[key] = value;
    const stringed = JSON.stringify(parsed);
    return fs.writeFile(file, stringed);
  } catch (err) {
    console.log(`Error ${err}`);
  }
}

/**
 * Deletes key from object and rewrites object to file
 * @param {string} file
 * @param {string} key
 */
async function remove(file, key) {
  try {
    const data = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(data);
    delete parsed[key];
    const stringed = JSON.stringify(parsed);
    return fs.writeFile(file, stringed);
  } catch (err) {
    console.log(`Error ${err}`);
  }
}

/**
 * Deletes file.
 * Gracefully errors if the file does not exist.
 * @param {string} file
 */
async function deleteFile(file) {
  try {
    const data = await fs.access(file);
    return fs.unlink(file);
    // const del = fs.unlink(data);
  } catch (err) {
    console.log(`Error ${err}`);
  }
}

/**
 * Creates file with an empty object inside.
 * Gracefully errors if the file already exists.
 * @param {string} file JSON filename
 */
async function createFile(file) {
  try {
    return await fs.writeFile(file, JSON.stringify({}));
  } catch (err) {
    console.log(`Error ${err}`);
  }
}

/**
 * Merges all data into a mega object and logs it.
 * Each object key should be the filename (without the .json) and the value should be the contents
 * ex:
 *  {
 *  user: {
 *      "firstname": "Scott",
 *      "lastname": "Roberts",
 *      "email": "sroberts@talentpath.com",
 *      "username": "scoot"
 *    },
 *  post: {
 *      "title": "Async/Await lesson",
 *      "description": "How to write asynchronous JavaScript",
 *      "date": "July 15, 2019"
 *    }
 * }
 */
function mergeData(fileA, fileB) {}

/**
 * Takes two files and logs all the properties as a list without duplicates
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *  union('scott.json', 'andrew.json')
 *  // ['firstname', 'lastname', 'email', 'username']
 */
function union(fileA, fileB) {}

/**
 * Takes two files and logs all the properties that both objects share
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    intersect('scott.json', 'andrew.json')
 *    // ['firstname', 'lastname', 'email']
 */
function intersect(fileA, fileB) {}

/**
 * Takes two files and logs all properties that are different between the two objects
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    difference('scott.json', 'andrew.json')
 *    // ['username']
 */
function difference(fileA, fileB) {}

module.exports = {
  get,
  set,
  remove,
  deleteFile,
  createFile,
  mergeData,
  union,
  intersect,
  difference,
};
