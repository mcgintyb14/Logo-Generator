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

        let shapeElement = '';
    
        switch (shape) {
          case 'circle':
            shapeElement = `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
            break;
          case 'triangle':
            shapeElement = `<polygon points="150,50 100,150 200,150" fill="${shapeColor}" />`;
            break;
          case 'square':
          default:
            shapeElement = `<rect width="100" height="100" fill="${shapeColor}" />`;
            break;
        }
    
        const svgContent = `<?xml version="1.0" standalone="no"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
         "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          ${shapeElement}
          <text x="50%" y="50%" text-anchor="middle" fill="${textColor}" font-size="48">${text}</text>
        </svg>
        `;        

        fs.writeFileSync('logo.svg', svgContent);
        console.log("Generated logo.svg");

    } catch (err) {
        console.error("Error:", err);
    }
}

// Call the function to create the logo and start the server
createLogo();


