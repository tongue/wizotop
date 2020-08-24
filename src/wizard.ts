import inquirer from "inquirer";
import questions from "./questions";
import scaffold from "./scaffold";
import { printAsciiText } from "./utils";

export type TypeOfProject = "svelte" | "react" | "vanilla";

export interface Options {
  project_name: string;
  org_name: string;
  domain: string;
  type_of_project: TypeOfProject;
  sapper?: boolean;
  storybook?: boolean;
}

const wizard = async () => {
  await printAsciiText("wizotop");

  const options: Options = await inquirer.prompt(questions);

  await scaffold(options);

  console.log(`${options.project_name} was created!`);
};

export default wizard;
