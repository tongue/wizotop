import path from "path";
import { replaceWordsInFiles, renameFolders } from "./utils";
import { Options } from "./wizard";

const cleanUp = async ({
  project_name,
  org_name,
  sapper,
  domain,
  storybook,
}: Options) => {
  const hasDomain = sapper;
  const root = path.join(process.cwd(), project_name);

  let files = ["package.json", "README.md", "packages/kit/package.json"];

  const words = {
    domain,
    org_name,
    project_name,
  };

  let folders = {};

  if (hasDomain) {
    files = [...files, "domain/package.json"];
    folders = {
      ...folders,
      domain,
    };
  }

  if (storybook) {
    files = [...files, "storybook/package.json"];
  }

  replaceWordsInFiles({ words, files, root });
  renameFolders({ folders, root });
};

export default cleanUp;
