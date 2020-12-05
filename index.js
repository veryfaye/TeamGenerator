const render = require("./lib/htmlRenderer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

let employee;
let employeeArray = [];

// array of questions for user


const employeeQuestion = [
  {
    type: "list",
    name: "employeeType",
    message: "Select the employee type",
    choices: ["Manager", "Engineer", "Intern"],
  },
];



function askQuestions() {
  inquirer.prompt(employeeQuestion).then((response) => {
    // console.log(response.employeeType);
    employee = response.employeeType;

    const standardQuestions = [
        {
          type: "input",
          name: "name",
          message: "What is the "+employee+"'s name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the "+employee+"'s id?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the "+employee+"'s email?",
        },
      ];

    const managerQuestions = [
        ...standardQuestions,
        {
          type: "input",
          name: "officeNumber",
          message: "What is the "+employee+"'s office number?",
        },
      ];
      
      const internQuestions = [
        ...standardQuestions,
        {
          type: "input",
          name: "school",
          message: "What is the "+employee+"'s school?",
        },
      ];
      
      const engineerQuestions = [
        ...standardQuestions,
        {
          type: "input",
          name: "gitHub",
          message: "What is the "+employee+"'s GitHub username?",
        },
      ];

    switch (employee) {
      case "Manager":
        employeeQuestion[0].choices.splice(0, 1);
        inquirer.prompt(managerQuestions).then((managerResponse) => {
        //   console.log(managerResponse);

          const manager = new Manager(
            managerResponse.name,
            managerResponse.id,
            managerResponse.email,
            managerResponse.officeNumber
          );

          employeeArray.push(manager);
          endOfEmployees();
        });
        break;
      case "Engineer":
        inquirer.prompt(engineerQuestions).then((engineerResponse) => {
        //   console.log(engineerResponse);
          const engineer = new Engineer(
            engineerResponse.name,
            engineerResponse.id,
            engineerResponse.email,
            engineerResponse.gitHub
          );

          employeeArray.push(engineer);
          endOfEmployees();
        });
        break;
      case "Intern":
        inquirer.prompt(internQuestions).then((internResponse) => {
        //   console.log(internResponse);
          const intern = new Intern(
            internResponse.name,
            internResponse.id,
            internResponse.email,
            internResponse.officeNumber
          );

          employeeArray.push(intern);
          endOfEmployees();
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
    //   console.log(response);
      if (response.end == "Yes") {
        askQuestions();
      } else {
        fs.writeFile("./output/index.html", render(employeeArray), (err) =>
          err ? console.error(err) : console.log("Index.html is saved")
        );
      }
    });
}

askQuestions();
