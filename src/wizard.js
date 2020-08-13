const font = require("ascii-art-font");
const details = require("./details");
const project = require("./project");
const scaffold = require("./scaffold");

let options = {};

async function scaffolder() {
	const title = await font.create("wizotop", "Doom");

	console.log(title);

	const { typeOfProject, ...detailsData } = await details();
	options = { ...options, ...detailsData, typeOfProject };

	const projectData = await project(typeOfProject);
	options = {...options, ...projectData};

	await scaffold(options);
}

module.exports = scaffolder;
