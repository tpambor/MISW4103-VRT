const { Given, When, Then } = require('@cucumber/cucumber');

const createPostPage = require("../pages/CreatePostPage");
const postsListPage = require("../pages/PostsListPage");
const loginPage = require("../pages/LoginPage");

Given('I sign in with {kraken-string} and {kraken-string}', async function (email, password) {
    return await loginPage.login(this.driver, email, password);
});

When('I create new Post', async function () {
    let btnNewPost = await postsListPage.getBtnNewPost(this.driver);
    return await btnNewPost.click();
});

When('I put as title {kraken-string}', async function (name) {
    let titleArea = await createPostPage.getTitleArea(this.driver);
    return await titleArea.setValue(name);
});

When('I click on other area', async function () {
    let postArea = await createPostPage.getPostArea(this.driver);
    return await postArea.click();
});

When('I click on posts link', async function () {
    let btn = await createPostPage.getPostsLink(this.driver);
    return await btn.click();
});

Then('I see the post {kraken-string} in the list', async function(postTitle) {
    let postListed = await postsListPage.getPost(this.driver, postTitle);
    return postListed.click();
});
