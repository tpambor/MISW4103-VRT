async function login(driver, email, password) {
    let fldEmail = await driver.$('#ember8');
    await fldEmail.setValue(email);
	let fldPwd = await driver.$('#ember10');
    await fldPwd.setValue(password);
	let btnSignIn = await driver.$('#ember12');
    return await btnSignIn.click();
}

module.exports = {login};