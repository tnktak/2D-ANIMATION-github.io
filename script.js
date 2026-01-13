// --- SIGN IN AND GET START ---
document.addEventListener('DOMContentLoaded', () => {
    // Select the main Modal Overlay
    const authModal = document.getElementById('authModal');
    
    // Select the Close "X" button
    const closeBtn = document.querySelector('.auth-close-x');
    
    // Select the containers for switching
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    // UI Elements for Logged In state
    const loggedOutUI = document.getElementById('logged-out-UI');
    const loggedInUI = document.getElementById('logged-in-UI');
    const userDisplayName = document.getElementById('user-display-name');

    // --- 1. CLOSING LOGIC ---

    // Function to close modal
    const closeModal = () => {
        authModal.style.display = 'none';
        // Optional: Reset forms when closing
        document.getElementById('loginForm').reset();
        document.getElementById('registerForm').reset();
    };

    // Close when clicking the "X"
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Close when clicking outside the white box (on the dark overlay)
    window.onclick = (event) => {
        if (event.target === authModal) {
            closeModal();
        }
    };

    // --- 2. OPENING LOGIC ---

    // Open Login (Sign In button)
    document.querySelector('.signin').onclick = (e) => {
        e.preventDefault();
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        authModal.style.display = 'block';
    };

    // Open Register (Get Started button)
    document.querySelector('.get-started').onclick = (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        authModal.style.display = 'block';
    };

    // --- 3. SWITCHING LOGIC (Inside Modal) ---

    document.getElementById('switchToRegister').onclick = () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    };

    document.getElementById('switchToLogin').onclick = () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    };

    // --- 4. AUTHENTICATION LOGIC ---

    const loginUser = (userData) => {
        localStorage.setItem("activeUser", JSON.stringify(userData));
        userDisplayName.innerText = "Hello, " + userData.name;
        if(loggedOutUI) loggedOutUI.style.display = "none";
        if(loggedInUI) loggedInUI.style.display = "flex";
        closeModal();
    };

    // Check if user is already logged in on refresh
    const savedUser = localStorage.getItem("activeUser");
    if (savedUser) {
        loginUser(JSON.parse(savedUser));
    }

    // Handle Registration
    document.getElementById('registerForm').onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const pass = document.getElementById('regPassword').value;
        const confirmPass = document.getElementById('regConfirmPassword').value;

        if (pass !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        const newUser = { name, email, pass };
        localStorage.setItem(`userDB_${email}`, JSON.stringify(newUser));
        alert("Registration successful! Please log in.");
        document.getElementById('switchToLogin').click();
    };

    // Handle Login
    document.getElementById('loginForm').onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;
        const storedUser = localStorage.getItem(`userDB_${email}`);

        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.pass === pass) {
                loginUser(userData);
            } else {
                alert("Incorrect password.");
            }
        } else {
            alert("Email not found. Please register.");
        }
    };

    // Handle Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem("activeUser");
            window.location.reload();
        };
    }
});