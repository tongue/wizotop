import font from "ascii-art-font";
import details from "./details";
import project from "./project";
import scaffold from "./scaffold";

export type TypeOfProject = "svelte" | "react" | "vanilla";

export interface Options {
	projectName: string,
	orgname: string,
	domain: string,
	typeOfProject: TypeOfProject,
	sapper?: boolean,
	storybook?: boolean,
};

let options: Options = {
	projectName: "",
	orgname: "",
	domain: "",
	typeOfProject: "svelte",
};

export default async function scaffolder() {
	const title = await font.create("wizotop", "Doom");

	console.log(title);

	const { typeOfProject, ...detailsData } = await details();
	options = { ...options, ...detailsData, typeOfProject };

	const projectData = await project(typeOfProject);
	options = {...options, ...projectData};

	await scaffold(options);
}
