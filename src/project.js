const inquirer = require("inquirer");

async function project(type) {
	let questions;
	switch(type) {
		case "svelte":
			questions = [
				{
					type: "confirm",
					name: "sapper",
					message: "Include Sapper?"
				},
				{
					type: "input",
					name: "domain",
					message: "Domain where sapper will be run?",
					when: (answers) => answers["sapper"],
					validate: (value) => value.match(/^((?:([a-z0-9]\.|[a-z0-9][a-z0-9\-]{0,61}[a-z0-9])\.)+)([a-z0-9]{2,63}|(?:[a-z0-9][a-z0-9\-]{0,61}[a-z0-9]))\.?$/) ? true : "Enter a valid domain. Ex: isotop.se",
				}
			];
			break;
		default:
			questions = [];
	}

	questions = [
		...questions,
		{
			type: "confirm",
			name: "storybook",
			message: "Include Storybook?"
		}
	];

	return await inquirer.prompt(questions);
}

module.exports = project;
