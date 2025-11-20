
const aboutBtn = document.getElementById("AboutBtn");
if (aboutBtn) {
    aboutBtn.addEventListener("click", () => {
    window.location.href = "/about" // Route via flask
    });
}

const SignInBtn = document.getElementById("SignInBtn");
if (SignInBtn) {
    SignInBtn.addEventListener("click", () => {
        window.location.href = "/signin"
    });
}

const BackBtn = document.getElementById("BackBtn");
if (BackBtn) {
    BackBtn.addEventListener("click", () => {
        window.location.href = "/"
    });
}

// Dummy credentials
const validNurseID = "123456";
const validPassword = "Password123";
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const nurseId = document.getElementById("nurseID").value.trim();
        const password = document.getElementById("password").value.trim();

        if (nurseId === "" || password === "") {
            alert("Please fill in both fields.");
            return;
        }

        if (nurseId === validNurseID && password === validPassword) {
            alert("Login successful!");
            window.location.href = "/tech";
        } else {
            alert("Please enter valid credentials!");
        }
    });
}
