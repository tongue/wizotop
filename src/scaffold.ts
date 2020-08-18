import clone from "./clone";
import { Options } from "./wizard";

export default async function scaffold(options: Options) {
	await clone(options);

	console.log(`${options.projectName} was created!`);
}
