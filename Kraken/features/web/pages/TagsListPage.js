async function getSlugList(driver) {
	return await driver.$('.gh-tag-list-slug span');
}

async function createNewTag(driver) {
	let btnNewTag = await driver.$('a[href="#/tags/new/"]');
    return btnNewTag.click();
}

async function getTag(driver, tagName) {
	return await driver.$('*='.concat(tagName));
}

async function getNumberOfTags(driver) {
	let list = await driver.$('ol');
	let tagNumber;
	//= await list.getProperty("childElementCount");
	list.getProperty("childElementCount").then((value) => {
		tagNumber = value;
	});
	return tagNumber;
}

module.exports = {getSlugList, createNewTag, getTag, getNumberOfTags};