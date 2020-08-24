import { Options } from "./wizard";

export default [
  {
    type: "input",
    name: "project_name",
    message: "what is the name of the project?",
    validate: (value: string) =>
      value.match(/^[0-9a-z_-]+$/)
        ? true
        : "please enter a valid project name (only lowercase letters and no spaces)",
  },
  {
    type: "input",
    name: "org_name",
    message: "organisation name?",
    default: "isotop",
    validate: (value: string) =>
      value.match(/^[0-9a-z_-]+$/)
        ? true
        : "please enter a valid organisation name (only lowercase letters and no spaces)",
  },
  {
    type: "list",
    name: "type_of_project",
    message: "what type of project do you want to create?",
    choices: ["react", "svelte", "vanilla"],
    filter: (val: string) => val.toLowerCase(),
  },
  {
    type: "confirm",
    name: "sapper",
    message: "Include Sapper?",
    when: (answers: Options) => answers.type_of_project === "svelte",
  },
  {
    type: "input",
    name: "domain",
    message: "Domain where sapper will be run?",
    when: (answers: Options) => answers.sapper,
    validate: (value: string) =>
      value.match(
        /^((?:([a-z0-9]\.|[a-z0-9][a-z0-9\-]{0,61}[a-z0-9])\.)+)([a-z0-9]{2,63}|(?:[a-z0-9][a-z0-9\-]{0,61}[a-z0-9]))\.?$/
      )
        ? true
        : "Enter a valid domain. Ex: isotop.se",
  },
  {
    type: "confirm",
    name: "storybook",
    message: "Include Storybook?",
  },
];
