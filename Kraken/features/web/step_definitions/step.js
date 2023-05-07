const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert')
//const { faker } = require('@faker-js/faker');

const createPostPage = require("../pages/CreatePostPage");
const postsListPage = require("../pages/PostsListPage");
const loginPage = require("../pages/LoginPage");
const tagsListPage = require("../pages/TagsListPage");

Given('I sign in with {kraken-string} and {kraken-string}', async function (email, password) {
    return await loginPage.login(this.driver, email, password);
});

Given('I see the posts of tag {string}', async function (tag) {
    let postLink = await tagsListPage.getPostLink(this.driver,tag);
    return await postLink.click();
});

When('I select create new Post', async function () {
    let btnNewPost = await postsListPage.getBtnNewPost(this.driver);
    return await btnNewPost.click();
});

When('I put as title {kraken-string}', async function (title) {
    let titleArea = await createPostPage.getTitleArea(this.driver);
    return await titleArea.setValue("Post ".concat(title));
});

When('I click on post settings', async function () {
    let settingsBtn = await createPostPage.getSettingsBtn(this.driver);
    return await settingsBtn.click();
});

When('I change the slug with {kraken-string}', async function (slug) {
    let urlArea = await createPostPage.getUrlArea(this.driver);
    return await urlArea.setValue(slug);
});

When('I select the tag {string}', async function (tag) {
    return await createPostPage.selectTag(this.driver,tag);
});

When('I click on close settings', async function () {
    let settingsBtn = await createPostPage.getSettingsCloseBtn(this.driver);
    return await settingsBtn.click();
});

When('I click on description area', async function () {
    let postArea = await createPostPage.getPostArea(this.driver);
    return await postArea.click();
});

When('I write a description', async function () {
    let postArea = await createPostPage.getPostArea(this.driver);
    return await postArea.setValue("Post Description");
});

When('I click on publish link', async function () {
    let publishLink = await createPostPage.getPublishLink(this.driver);
    return await publishLink.click();
});

When('I click on publish button', async function () {
    let publishBtn = await createPostPage.getPublishBtn(this.driver);
    return await publishBtn.click();
});

When('I click on posts link', async function () {
    let postsLink = await createPostPage.getPostsLink(this.driver);
    return await postsLink.click();
});

Then('I filter by Published posts', async function () {
    let filter = await postsListPage.getAllPostFilter(this.driver);
    await filter.click();
    let selection = await postsListPage.selectFilter(this.driver,"Published posts");
    return await selection.click();
});

Then('I see the post {kraken-string} in the list', async function(postTitle) {
    let postListed = await postsListPage.getPost(this.driver, postTitle);
    return postListed.click();
});

Then('I could navigate to page with {kraken-string}', async function(url) {
    let completeURL = "http://localhost:2368/".concat(url);
    console.log(completeURL);
    return await this.driver.url(completeURL);
});
