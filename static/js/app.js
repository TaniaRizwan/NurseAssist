
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

// Tier Switching
setInterval(() => {
    fetch('/get_stress_data')
        .then(res => res.json())
        .then(data => {

            // Update badge
            document.getElementById("ConditionStatus").innerText = data.Stress_State;
            document.getElementById("ConditionMetrics").innerHTML =
                `HR: ${data.Heart_Rate_bpm} &nbsp; 
                 Gaze: ${data.Gaze_State} &nbsp;
                 Step: ${data.Step_Trend}`;

            // Hide all tiers
            document.getElementById("Tier1").style.display = "none";
            document.getElementById("Tier2").style.display = "none";
            document.getElementById("Tier3").style.display = "none";

            // Show correct tier
            if (data.HR_Threshold_Label === "Normal") 
                document.getElementById("Tier1").style.display = "block";

            else if (data.HR_Threshold_Label === "Moderate") 
                document.getElementById("Tier2").style.display = "block";

            else 
                document.getElementById("Tier3").style.display = "block";
        });
}, 800);

