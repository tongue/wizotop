import fs from "fs";
import path from "path";
import { replaceInFile } from "replace-in-file";
import font from "ascii-art-font";

export const printAsciiText = async (text: string) => {
  const asciiText = await font.create(text, "Doom");
  console.log(asciiText);
};

export const replaceAll = async (files: string[], from: string, to: string) => {
  const fromRegExp = new RegExp(from, "g");

  try {
    await replaceInFile({
      files,
      from: fromRegExp,
      to,
    });
  } catch (error) {
    console.error(error);
  }
};

interface ReplaceWordsInFiles {
  words: { [key: string]: string };
  files: string[];
  root: string;
}

export const replaceWordsInFiles = async ({
  words,
  files,
  root = "",
}: ReplaceWordsInFiles) => {
  const normalizedFiles = files.map((file) => path.join(root, file));

  for (const [from, to] of Object.entries(words)) {
    await replaceAll(normalizedFiles, from, to);
  }
};

interface RenameFolders {
  folders: { [key: string]: string };
  root: string;
}

export const renameFolders = ({ folders, root = "" }: RenameFolders) => {
  for (const [from, to] of Object.entries(folders)) {
    try {
			const joinedFrom = path.join(root, from);
      if (fs.existsSync(joinedFrom)) {
        fs.renameSync(joinedFrom, path.join(root, to));
      } else {
				console.error("no such file:", from);
			}
    } catch (error) {
      console.error(error);
    }
  }
};
