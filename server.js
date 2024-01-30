// import functionality for express, fs, and inquirer (node modules are installed)
const fs = require('fs');
const inquirer = require('inquirer');
const http = require('http');

// create function which starts with an inquirer prompt to gather user input for the three letters, shape / text color as well as shape of the logo
async function createLogo() {
    try {
      const answers = await inquirer.prompt([
        {
          name: 'text',
          message: 'Enter up to three characters:',
          validate: function (input) {
            return input.length <= 3 ? true : 'Please enter up to three characters.'; // Ensure that the input for the letters contains more than three letters
          }
        },
        {
          name: 'textColor',
          message: 'Enter text color (color keyword or hexadecimal number):'
        },
        {
          name: 'shape',
          message: 'Choose a shape:',
          type: 'list',
          choices: ['circle', 'triangle', 'square']
        },
        {
          name: 'shapeColor',
          message: 'Enter shape color (color keyword or hexadecimal number):'
        }
      ]);
  
      const { text, textColor, shape, shapeColor } = answers;
  


