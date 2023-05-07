async function getBtnNewPost(driver) {
	return await driver.$('.ember-view.gh-btn.gh-btn-green');
}

async function getPost(driver, postTitle) {
	return await driver.$('*='.concat(postTitle));
}

async function getAllPostFilter(driver) {
	return await driver.$('.ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger');
}

async function selectFilter(driver,filter) {
	return await driver.$('li[data-option-index="2"]');
}

module.exports = {getBtnNewPost, getPost, getAllPostFilter, selectFilter};
