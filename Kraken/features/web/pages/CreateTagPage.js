
async function fillInName(driver, name){
    let nameField = await driver.$('input[name="name"]');
	return await nameField.setValue(name);
}

async function fillInColor(driver, color){
    let nameField = await driver.$('input[name="accent-color"]');
	return await nameField.setValue(color);
}

async function fillInShortDescription(driver, name){
    let nameField = await driver.$('#tag-description');
	return await nameField.setValue(name);
}

async function save(driver){
    let button = await driver.$('button=Save');
    button.click();
    return button;
}

async function getSlug(driver){
    return await driver.$('input[name="slug"]');
}

async function getErrorMessage(driver) {
    let message = await driver.$('.response');
    return await message.getProperty("innerText");
}

async function getColorErrorMessage(driver) {
    let message = await driver.$('/html/body/div[2]/div/main/section/form/div/div[1]/div[1]/div[1]/div[1]/span/p[2]');
    return await message.getProperty("innerText");
}

async function getDescriptionErrorMessage(driver) {
    let message = await driver.$('/html/body/div[2]/div/main/section/form/div/div[1]/div[1]/div[3]/p[1]');
    return await message.getProperty("innerText");
}

async function leave(driver){
    let buttonLeave = await driver.$('button=Leave');
    return buttonLeave.click();
}

async function leaveStaff(driver){
    let buttonLeave = await driver.$('.gh-btn-red');
    return buttonLeave.click();
}

module.exports = {fillInName, fillInColor, fillInShortDescription,getDescriptionErrorMessage,leaveStaff, save, getSlug, getErrorMessage, 
    getColorErrorMessage, leave};