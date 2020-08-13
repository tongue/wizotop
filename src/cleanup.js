const fs = require("fs");
const path = require("path");
const replace = require("replace-in-file");

const replaceProjectName = async (files, projectName) => {
	try {
		await replace({
			files,
			from: /projectName/g,
			to: projectName
		});
	} catch (error) {
		console.error(error);
	}
}

const replaceDomain = async (files, domain) => {
	try {
		await replace({
			files,
			from: /domain/g,
			to: domain
		});
	} catch (error) {
		console.error(error);
	}
}

const replaceOrgName = async (files, orgName) => {
	try {
		await replace({
			files,
			from: /orgname/g,
			to: orgName
		});
	} catch (error) {
		console.error(error);
	}
}

async function cleanUpSvelte({ projectName, orgName, sapper, domain, storybook }) {
	const root = path.join(process.cwd(), projectName);
	const domainPath = path.join(root, "domain");
	const domainPackageJson = path.join(domainPath, "package.json");
	const storybookPackageJson = path.join(root, "storybook", "package.json");
	const rootPackageJson = path.join(root, "package.json");
	const rootReadme = path.join(root, "README.md");
	const kitPackageJson = path.join(root, "packages", "kit", "package.json");

	if (sapper) {
		// replace occurence of domain in sapper package.json
		await replaceDomain(domainPackageJson, domain);
		await replaceOrgName(domainPackageJson, orgName);

		await replaceDomain(rootPackageJson, domain);
		await replaceOrgName(rootPackageJson, orgName);

		await replaceDomain(rootReadme, domain);

		try {
			fs.renameSync(domainPath, path.join(root, domain));
		} catch (error) {
			console.error(error);
		}
	} else {
		// remove all scripts and references to domain
		// and remove domain folder
	}

	// TODO: If you choose not to have sapper but storybook
	// another static folder is needed.
	if (storybook) {
		await replaceOrgName(storybookPackageJson, orgName);
		await replaceDomain(storybookPackageJson, domain);
	} else {
		// remove all storybook scripts and folder
	}

	await replaceOrgName(kitPackageJson, orgName);
	await replaceProjectName(rootReadme, projectName);
}

module.exports = cleanUpSvelte;
