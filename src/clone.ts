import degit from "degit";
import { Options } from "./wizard";

const log = ({ message }: { [key: string]: string }) => console.log(message);

const repos = {
  svelte: "tongue/svelte-template",
  react: "tongue/react-template",
  vanilla: "tongue/vanilla-template",
};

const clone = async ({ type_of_project, project_name }: Options) => {
  const emitter = degit(repos[type_of_project], {
    cache: false,
    force: true,
    verbose: false,
  });

  emitter.on("info", log);
  return await emitter.clone(`${project_name}`);
};

export default clone;
