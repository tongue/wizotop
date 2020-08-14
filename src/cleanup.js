const fs = require("fs");
const path = require("path");
const replace = require("replace-in-file");

const replaceAll = async (files, from, to) => {
	const fromRegExp = new RegExp(from, "g");
	try {
		await replace({
			files,
			from: fromRegExp,
			to
		});
	} catch (error) {
		console.error(error);
	};
};

const replaceWordsInFiles = async (wordsToReplace, filesToUpdate) => {
	for (const [from, to] of Object.entries(wordsToReplace)) {
		await replaceAll(filesToUpdate, from, to);
	};
};

const renameFolders = (folders) => {
	for (const [from, to] of Object.entries(folders)) {
		try {
			if (fs.existsSync(from)) {
				fs.renameSync(from, to);
			}
		} catch (error) {
			console.error(error);
		}
	};
};

async function cleanUpSvelte({ projectName, orgname, sapper, domain, storybook }) {
	const root = path.join(process.cwd(), projectName);
	const domainPath = path.join(root, "domain");

	const filesToUpdate = [
		path.join(domainPath, "package.json"),
		path.join(root, "storybook", "package.json"),
		path.join(root, "package.json"),
		path.join(root, "README.md"),
		path.join(root, "packages", "kit", "package.json")
	];

	const wordsToReplace = {
		domain,
		orgname,
		projectName
	};

	const foldersToRename = {
		[domainPath]: domain
	}

	replaceWordsInFiles(wordsToReplace, filesToUpdate);
	renameFolders(foldersToRename);

	if (sapper) {
	} else {
		// remove all scripts and references to domain
		// and remove domain folder
	}

	// TODO: If you choose not to have sapper but storybook
	// another static folder is needed.
	if (!storybook) {
		// remove all storybook scripts and folder
	}
}

module.exports = cleanUpSvelte;
