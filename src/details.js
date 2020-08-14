const inquirer = require("inquirer");

async function details() {
	const questions = [
		{
			type: "input",
			name: "projectName",
			message: "What is the name of the project?",
			validate: (value) => value.match(/^[0-9a-z_-]+$/) ? true : "Please enter a valid project name (only lowercase letters and no spaces)",
		},
		{
			type: "input",
			name: "orgname",
			message: "Organisation name?",
			default: "isotop",
			validate: (value) => value.match(/^[0-9a-z_-]+$/) ? true : "Please enter a valid organisation name (only lowercase letters and no spaces)",
		},
		{
			type: "list",
			name: "typeOfProject",
			message: "What type of project do you want to create?",
			choices: ["React", "Svelte", "Vanilla"],
			filter: (val) => val.toLowerCase(),
		}
	];

	return await inquirer.prompt(questions);
}

module.exports = details;
