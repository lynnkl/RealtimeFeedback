function validatePassword(event) {
    var passwordInput = document.getElementById("password");
    var repasswordInput = document.getElementById("repassword");
    var password = passwordInput.value;
    var repassword = repasswordInput.value;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/; // Muss min. 1 kleinbuchstabe, 1 grossbuchstabe, 1 zahl und 12 Zeichen enthalten
    const isValid = regex.test(password);

    if(!isValid) {
        passwordInput.setCustomValidity("Passwort muss min. 12 Zeichen, darunter 1 Grossbuchstabe, 1 Kleinbuchstabe und 1 Zahl enthalten.");
    } else {
        passwordInput.setCustomValidity("");
    }

    if(!passwordInput.reportValidity()) {
        event.preventDefault();
        return;
    }

    const isSame = password === repassword;

    if(!isSame) {
        repasswordInput.setCustomValidity("Passwort muss übereinstimmen.");
    } else {
        repasswordInput.setCustomValidity("");
    }

    if(!repasswordInput.reportValidity()) {
        event.preventDefault();
    }
}