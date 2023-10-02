const fs = require('fs');

const inquirer = require('inquirer');

const {Triangle, Square, Circle} = require('./lib/shapes');

function writeToFile(fileName, answers) {
    let svgString = "";
    svgString = '<svg version="1.1" width="500" height="500" xmlns="http://www.w3.org/2000/svg">';
    svgString += "<g>";
    svgString += `${answers.shape}`;

    let shapeChoice;
    if (answers.shape === 'Triangle') {
        shapeChoice = new Triangle();
        svgString += `<polygon points="250,60 100,400 400,400" fill="${answers.backgroundColor}"/>`;
    }else if (answers.shape === 'Square') {
        shapeChoice = new Square();
        svgString += `<rect x="150" y="150" width="200" height="200" fill="${answers.backgroundColor}"/>`;
    }else {
        shapeChoice = new Circle();
        svgString += `<circle cx="250" cy="250" r="150" fill="${answers.backgroundColor}"/>`;
    }

    svgString += `<text x="250" y="250" text-anchor="middle" font-size="50" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";

    fs.writeFile(fileName, svgString, (error) => {
        error ? console.log(error) : console.log("File created!");
    });
}

function promptUser() {
    inquirer
     .prompt([
        {
            type: 'list',
            message: "What shape would you like to use for you Logo?",
            choices: ['Triangle', 'Square', 'Circle'],
            name: "shape"
        },
        {
            type: 'input',
            message: "What background color would you like for your Logo?",
            name: "backgroundColor"
        },
        {
            type: 'input',
            message: "Choose up to 3 Characters for your Logo Text",
            name: "text"
        },
        {
            type: 'input',
            message: "Choose a text color for your Logo",
            name: "textColor"
        },
     ])
     .then(answers => {
       if (answers.text.length > 3) {
        console.log("Text must be 3 characters or less");
        promptUser();
       }else {
        writeToFile('logo.svg', answers);
       }
     });
}

promptUser();