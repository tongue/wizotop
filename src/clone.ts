import degit from "degit";
import { Options } from "./wizard";

const log = ({ message }: { [key: string]: string }) => console.log(message);

const repos = {
  svelte: "tongue/svelte-template",
  react: "tongue/react-template",
  vanilla: "tongue/vanilla-template",
};

export default async ({ typeOfProject, projectName }: Options) => {
  const emitter = degit(repos[typeOfProject], {
    cache: false,
    force: true,
    verbose: false,
  });

  emitter.on("info", log);
  return await emitter.clone(`${projectName}`);
};
