const degit = require("degit");
const cleanup = require("./cleanup");

const log = ({ message }) => console.log(message);

async function svelte(options) {
	const emitter = degit("tongue/svelte-template", {
		cache: false,
		force: true,
		verbose: false,
	});

	emitter.on("info", log);
	await emitter.clone(`${options.projectName}`);

	await cleanup(options);
}

async function react(options) {
	const { projectName } = options;
	const emitter = degit("tongue/react-template", {
		cache: false,
		force: true,
		verbose: false,
	});

	emitter.on("info", log);
	await emitter.clone(`${projectName}`);
}

async function vanilla(options) {
	const { projectName } = options;
	const emitter = degit("tongue/vanilla-template", {
		cache: false,
		force: true,
		verbose: false,
	});

	emitter.on("info", log);
	await emitter.clone(`${projectName}`);
}

async function scaffold(options) {
	const { typeOfProject, projectName } = options;

	switch (typeOfProject) {
		case "svelte":
			await svelte(options);
			break;
		case "react":
			await react(options);
			break;
		case "vanilla":
			await vanilla(options);
			break;
	}

	console.log(`${projectName} was created!`);
}

module.exports = scaffold;
