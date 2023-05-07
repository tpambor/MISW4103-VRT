async function getTitleArea(driver) {
	return await driver.$('textarea.gh-editor-title');
}

async function getPostArea(driver) {
	return await driver.$('.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
}

async function getPostsLink(driver) {
	return await driver.$('*=Posts');
}

async function getPublishLink(driver){
	return await driver.$('.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger');
}

async function getPublishBtn(driver){
	return await driver.$('.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view');
}

async function getSettingsBtn(driver){
	return await driver.$('.post-settings');
}

async function getOptSchedule(driver){
	return await driver.$('/html/body/div[1]/div/div/section/div/div[2]/div[1]');
}

async function getSettingsCloseBtn(driver){
	return await driver.$('button[aria-label="Close"]');
}

async function getUrlArea(driver){
	return await driver.$('input[name="post-setting-slug"]');
}

async function selectTag(driver, tag){
	let tagField = await driver.$('#tag-input');
	await tagField.click();
	let tagSelector = await driver.$('li*='.concat(tag));
	return await tagSelector.click();
}

module.exports = {getTitleArea, getPostArea, getPostsLink, getPublishLink, getPublishBtn, 
	getSettingsBtn, getUrlArea, getOptSchedule, getSettingsCloseBtn, selectTag};
