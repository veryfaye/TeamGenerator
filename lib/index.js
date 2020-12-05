const render = require("./htmlRenderer");
const inquirer = require("inquirer");

let employee;

// array of questions for user
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

const employeeQuestion = [
  {
    type: "list",
    name: "employeeType",
    message: "Select the " + employee + " type",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

const managerQuestions = [
  ...standardQuestions,
  {
    type: "input",
    name: "officeNumber",
    message: "What is the " + employee + "'s office number?",
  },
];

const internQuestions = [
  ...standardQuestions,
  {
    type: "input",
    name: "school",
    message: "What is the " + employee + "'s school?",
  },
];

const engineerQuestions = [
  ...standardQuestions,
  {
    type: "input",
    name: "gitHub",
    message: "What is the " + employee + "'s GitHub username?",
  },
];

function askQuestions() {
  inquirer.prompt(employeeQuestion).then((response) => {
    console.log(response.employeeType);
    employee = response.employeeType;

    switch (employee) {
      case "Manager":
        employeeQuestion[0].choices.splice(0, 1);
        inquirer.prompt(managerQuestions).then((managerResponse) => {
          console.log(managerResponse);
          endOfEmployees();
        });
        break;
      case "Engineer":
        inquirer.prompt(engineerQuestions).then((engineerResponse) => {
          console.log(engineerResponse);
          endOfEmployees();
        });
        break;
      case "Intern":
        inquirer.prompt(internQuestions).then((internResponse) => {
          console.log(internResponse);
          endOfEmployees;
        });
        break;
    }
  });
}

function endOfEmployees() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "end",
        message: "Are there more Employees to Enter>",
        choices: ["Yes", "No"],
      },
    ])
    .then((response) => {
        console.log(response)
      if (response.end == "Yes") {
        askQuestions();
      }
    });
}

askQuestions();