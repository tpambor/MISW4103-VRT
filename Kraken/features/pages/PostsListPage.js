async function getBtnNewPost(driver) {
	return await driver.$('.ember-view.gh-btn.gh-btn-green');
}

async function getNumberOfPosts(driver) {
	let postList = await driver.$('.gh-list-row.gh-posts-list-item');
    return postList.its('length');
}

module.exports = {getBtnNewPost, getNumberOfPosts};
