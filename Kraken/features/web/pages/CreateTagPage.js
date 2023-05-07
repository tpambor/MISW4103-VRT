
async function fillInName(driver, name){
    let nameField = await driver.$('input[name="name"]');
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

module.exports = {fillInName, save, getSlug};