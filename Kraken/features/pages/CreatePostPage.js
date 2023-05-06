async function getTitleArea(driver) {
	return await driver.$('textarea[placeholder="Post Title"]');
}

async function getPostArea(driver) {
	return await driver.$('.gh-koenig-editor-pane.flex.flex-column.mih-100');
}

async function getPostsLink(driver) {
	return await driver.$('*=Posts');
}

module.exports = {getTitleArea, getPostArea, getPostsLink};
