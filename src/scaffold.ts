import clone from "./clone";
import cleanup from "./cleanup";
import { Options } from "./wizard";

const scaffold = async (options: Options) => {
  await clone(options);
	await cleanup(options);
};

export default scaffold;
