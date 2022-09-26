function getRandomString(length=5){
    const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    // const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    )}
    return result;
    }
    function getRandomEmail(){
        const randomString= getRandomString()
        return randomString+'@gmail.com'
    }
    module.exports= {
        getRandomString,getRandomEmail
    }
    