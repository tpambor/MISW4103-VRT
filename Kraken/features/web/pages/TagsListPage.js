async function getPostLink(driver,tag) {
    let text="List posts tagged with '".concat(tag).concat("'");
	return await driver.$('aria/'.concat(text));
}

module.exports = {getPostLink};