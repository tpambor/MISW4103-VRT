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

module.exports = {getSlugList, createNewTag, getTag};