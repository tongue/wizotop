import clone from "./clone";
import { Options } from "./wizard";

const scaffold = async (options: Options) => {
  await clone(options);
};

export default scaffold;
