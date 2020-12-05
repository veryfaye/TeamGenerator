const render = require("./lib/htmlRenderer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

let employee;
let employeeArray = [];

// array of questions for user

// Initial question to ask of what employee type is the user collection data on
const employeeQuestion = [
  {
    type: "list",
    name: "employeeType",
    message: "Select the employee type",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

// asks the question declared above
function askQuestions() {
  inquirer.prompt(employeeQuestion).then((response) => {
    // after the response is collected then store the employee type in the employee variable
    employee = response.employeeType;

    // using the employee variable to personalize the potential next questions to ask
    const standardQuestions = [
      {
        type: "input",
        name: "name",
        message: "What is the " + employee + "'s name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the " + employee + "'s id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the " + employee + "'s email?",
      },
    ];

    // This is the manager specific question, the standard questions come first
    const managerQuestions = [
      ...standardQuestions,
      {
        type: "input",
        name: "officeNumber",
        message: "What is the " + employee + "'s office number?",
      },
    ];

    // This is the intern specific question, the standard questions come first
    const internQuestions = [
      ...standardQuestions,
      {
        type: "input",
        name: "school",
        message: "What is the " + employee + "'s school?",
      },
    ];

    //this is the engineer specific question, the standard questions come first.
    const engineerQuestions = [
      ...standardQuestions,
      {
        type: "input",
        name: "gitHub",
        message: "What is the " + employee + "'s GitHub username?",
      },
    ];

    // Depending on the employee selected by the user the employee specific questions are asked
    switch (employee) {
      case "Manager":
        // if manager is selected, then it is removed from the initial question array. Only one manager can be selected
        employeeQuestion[0].choices.splice(0, 1);

        // Ask the manager specific questions
        inquirer.prompt(managerQuestions).then((managerResponse) => {
          const manager = new Manager(
            managerResponse.name,
            managerResponse.id,
            managerResponse.email,
            managerResponse.officeNumber
          );

          // add the manager object instance to the employee array to use later for generating the HTML file
          employeeArray.push(manager);
          // ask the user if they have reached the end of their employees
          endOfEmployees();
        });
        break;
      case "Engineer":

        // Ask the engineer specific questions
        inquirer.prompt(engineerQuestions).then((engineerResponse) => {
          const engineer = new Engineer(
            engineerResponse.name,
            engineerResponse.id,
            engineerResponse.email,
            engineerResponse.gitHub
          );
          
          // add the engineer object instance to the employee array to use later for generating the HTML file
          employeeArray.push(engineer);
          // ask the user if they have reached the end of their employees
          endOfEmployees();
        });
        break;
      case "Intern":

        // ask the intern specific questions
        inquirer.prompt(internQuestions).then((internResponse) => {
          const intern = new Intern(
            internResponse.name,
            internResponse.id,
            internResponse.email,
            internResponse.officeNumber
          );

          // add the intern object instance to the employee array to use later for generating the HTML file
          employeeArray.push(intern);
          // ask the user if they have reached the end of their employees
          endOfEmployees();
        });
        break;
    }
  });
}

function endOfEmployees() {
  // ask the user if they have more employees to enter information
  inquirer
    .prompt([
      {
        type: "list",
        name: "end",
        message: "Are there more Employees to Enter?",
        choices: ["Yes", "No"],
      },
    ])
    .then((response) => {
      // if the user responded yes then askQuestions is called again to ask what employee type they are entering
      if (response.end == "Yes") {
        askQuestions();
      } else 
      // if the user responded no then a HTML file is generated using the employeeArray
      {
        fs.writeFile("./output/index.html", render(employeeArray), (err) =>
          err ? console.error(err) : console.log("Index.html is saved")
        );
      }
    });
}

askQuestions();
