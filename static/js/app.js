
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

// Toggle System
let tierFeatureEnabled = true; 

document.getElementById("FeatureToggle").addEventListener("change", (evt) => {
    tierFeatureEnabled = evt.target.checked;

    if (!tierFeatureEnabled) {
        // Hide all tiers
        document.getElementById("Tier1").style.display = "none";
        document.getElementById("Tier2").style.display = "none";
        document.getElementById("Tier3").style.display = "none";
    }
});


// Tier Switching
setInterval(() => {
    fetch('/get_stress_data')
        .then(res => res.json())
        .then(data => {

            const scanStatus = document.getElementById("scanStatus");
            const conditionBadge = document.getElementById("ConditionBadge");

            conditionBadge.style.display = "flex"; // Show condition badge

            // Hide all tiers initially
            document.getElementById("Tier1").style.display = "none"; 
            document.getElementById("Tier2").style.display = "none";
            document.getElementById("Tier3").style.display = "none";


            if (data.Face_Detected) {
                // Face detected mode 

                scanStatus.style.display = "none";  // Hide waiting box
                // conditionBadge.style.display = "flex"; // Show condition badge

                // Update badge text
                document.getElementById("ConditionStatus").innerText = data.Stress_State;
                document.getElementById("ConditionMetrics").innerHTML =
                    `HR: ${data.Heart_Rate_bpm} &nbsp; 
                    Gaze: ${data.Gaze_State} &nbsp;
                    Step: ${data.Step_Trend}`;

                // if toggle is OFF -> dont show tiers
                if (!tierFeatureEnabled) return; 

                // Otherwise, show correct tier
                if (data.HR_Threshold_Label === "Normal") 
                    document.getElementById("Tier1").style.display = "block";

                else if (data.HR_Threshold_Label === "Moderate") 
                    document.getElementById("Tier2").style.display = "block";

                else 
                    document.getElementById("Tier3").style.display = "block";

            } else {

                // No face detected mode
                scanStatus.style.display = "block"; // Show waiting message
                scanStatus.innerText = "No Patient Detected";

                // conditionBadge.style.display = "none"; // Hide condition badge
                // Tier boxes already hidden above
            }
        });
}, 800);

