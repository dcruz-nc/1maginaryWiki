// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // User is logged in
        console.log('user logged in as', user);
        showLogoutButton();
        hideLoginScreenButton();

        // Save login state to local storage
        localStorage.setItem('loggedIn', 'true');

        hideLoginElements(); // Hide login elements after successful login
    } else {
        // User is logged out
        console.log('user logged out');
        showLoginScreenButton();
        hideLogoutButton();
        sendUserToHome();
        
        // Save login state to local storage
        localStorage.setItem('loggedIn', 'false');
    }
});

// Function to show the login screen button
function showSignupButton() {
    const signupButton = document.querySelector('#signup-screen-button');
    signupButton.style.display = 'block';
}

// Function to show the login screen button
function showLoginScreenButton() {
    const loginScreenButton = document.querySelector('#login-screen-button');
    loginScreenButton.style.display = 'block';
}

// Function to show the login screen button
function hideLoginScreenButton() {
    const loginScreenButton = document.querySelector('#login-screen-button');
    const loggingIn = document.querySelector('#logging-in');
    const loggingInHeader = document.querySelector('#logging-in-header');
    loginScreenButton.style.display = 'none';
    loggingInHeader.style.display = 'none';
    loggingIn.style.display = 'none';
}

// Function to show the logout button
function showLogoutButton() {
    const logoutButton = document.querySelector('#logout-button');
    logoutButton.style.display = 'block';
}

// Function to hide the logout button
function hideLogoutButton() {
    const logoutButton = document.querySelector('#logout-button');
    logoutButton.style.display = 'none';
}

function sendUserToHome() {
    window.location.href = "https://1maginary.online/wiki";
}


function showLoginElements() {
    // Get references to the elements
    const loginBox = document.getElementById('login-box');
    const loginBackground = document.getElementById('login-background');
    const centerContainer = document.getElementById('center-container');
    const signupBox = document.getElementById('signup-box');
    const signupWindowBox = document.getElementById('signup-window-box');
    const loginWindowBox = document.getElementById('login-window-box');

    // Make sure all elements are initially hidden
    loginBox.style.display = 'none';
    loginBackground.style.display = 'none';
    loginBackground.style.pointerEvents = 'none';
    centerContainer.style.display = 'none';
    centerContainer.style.pointerEvents = 'none';
    signupBox.style.display = 'none';
    signupWindowBox.style.display = 'none';
    loginWindowBox.style.display = 'none';

    centerContainer.style.display = 'flex';
    centerContainer.style.zIndex = 499;
    loginBackground.style.display = 'block';

    signupWindowBox.style.display = 'flex';
    signupWindowBox.style.zIndex = 500;
    signupWindowBox.style.pointerEvents = 'auto';

    loginWindowBox.style.display = 'flex';
    loginWindowBox.style.zIndex = 500;
    loginWindowBox.style.pointerEvents = 'auto';

    loginBox.style.display = 'flex';
    loginBox.style.zIndex = 500;
    loginBox.style.pointerEvents = 'auto';

    signupBox.style.pointerEvents = 'auto';
}

function hideLoginElements() {
    const loginBox = document.getElementById('login-box');
    const loginBackground = document.getElementById('login-background');
    const centerContainer = document.getElementById('center-container');

    loginBox.style.display = 'none';
    loginBackground.style.display = 'none';
    loginBackground.style.zIndex = '-1000';
    loginBackground.style.pointerEvents = 'none';
    centerContainer.style.display = 'none';
    centerContainer.style.zIndex = '-1000';
    centerContainer.style.pointerEvents = 'none';
}

function showSignupElements() {
    // Get references to the elements
    const loginBox = document.getElementById('login-box');
    const loginBackground = document.getElementById('login-background');
    const centerContainer = document.getElementById('center-container');
    const signupBox = document.getElementById('signup-box');
    const signupWindowBox = document.getElementById('signup-window-box');
    const loginWindowBox = document.getElementById('login-window-box');

    // Make sure all elements are initially hidden
    loginBox.style.display = 'none';
    loginBackground.style.display = 'none';
    loginBackground.style.pointerEvents = 'none';
    centerContainer.style.display = 'none';
    centerContainer.style.pointerEvents = 'none';
    signupBox.style.display = 'none';
    signupWindowBox.style.display = 'none';
    loginWindowBox.style.display = 'none';

    centerContainer.style.display = 'flex';
    centerContainer.style.zIndex = 499;
    loginBackground.style.display = 'block';

    signupWindowBox.style.display = 'flex';
    signupWindowBox.style.zIndex = 500;
    signupWindowBox.style.pointerEvents = 'auto';

    loginBox.style.display = 'flex';
    loginBox.style.zIndex = 500;
    loginBox.style.pointerEvents = 'auto';

    signupBox.style.pointerEvents = 'auto';
}





// Function to add a document to the "user-collection" after a delay
async function addUserDocumentWithDelay() {
    try {
        // Add a 5-second delay
        await new Promise(resolve => setTimeout(resolve, 5000));

        const user = auth.currentUser; // Get the currently signed-in user
        if (user) {
            // If user is signed in, use their UID
            const uid = user.uid;

            // Add a document with the user's UID as the document ID to the collection
            await db.collection('user-collection').doc(uid).set({
                // Set the display name retrieved from authentication
                name: user.displayName,
                points: 1,
                submissionCount: 0,
                // Add the subcollection "items" with its documents
                items: {
                    "broken-phone": 0,
                    "usb": 0,
                    "batteries": 0,
                    "angel-keychain": 0,
                    "oatmeal": 0,
                    "first-aid-kit": 0,
                    "duct-tape": 0,
                    "broken-antenna": 0,
                    "oatmeal-recipe": 0,
                    "wires": 0,
                    "fixed-phone" : 0,
                    "lizas-guitar" : 0,
                    "gear-medallion" : 0,
                    "heart-lollipop" : 0,
                    "lighter" : 0,
                    "cigarettes" : 0,
                    "chloe-ipod" : 0,
                    "three-d-glasses" : 0,
                    "journal" : 0,
                    "vitamins" : 0
                    
                }
            });

            console.log("Document added successfully!");
        }
    } catch (error) {
        console.error("Error adding document:", error);
    }
}





// signup
const signupForm = document.querySelector('#signup-form');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordMatchError = document.getElementById('password-match-error');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const confirmPassword = confirmPasswordInput.value;
    const username = signupForm['signup-username'].value;

    // Check if passwords match
    if (password !== confirmPassword) {
        passwordMatchError.textContent = 'Passwords do not match.';
        return; // Do not proceed with signup
    }

    // Clear any previous error messages
    passwordMatchError.textContent = '';

    // Continue with signup
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            // Update the user profile with the username
            return cred.user.updateProfile({
                displayName: username
            });
        })
        .then(() => {
            console.log('User signed up successfully with username:', username);
            addUserDocumentWithDelay();

            // Hide the signup-box after successful signup
            hideSignupElements();
            location.reload();
        })
        .catch(error => {
            console.error('Error signing up:', error.message);
        });
});

// Function to hide signup elements
function hideSignupElements() {
    const signupBox = document.querySelector('#signup-box');
    const loginBackground = document.querySelector('#login-background');
    const centerContainer = document.querySelector('#center-container');

    signupBox.style.display = 'none';
    loginBackground.style.display = 'none';
    loginBackground.style.zIndex = '-1000';
    loginBackground.style.pointerEvents = 'none';
    centerContainer.style.display = 'none';
    centerContainer.style.zIndex = '-1000';
    centerContainer.style.pointerEvents = 'none';
}

// logout
const logout = document.querySelector('#logout-button');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        localStorage.setItem('loggedIn', 'false');
        window.location.href = "file:///home/ava/Desktop/1maginaryWiki/1maginaryWiki/index.html"; 
    });
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // Hide the login elements after successful login
        console.log("login success!");
        localStorage.setItem('loggedIn', 'true');
        hideLoginElements();
        location.reload();
    }).catch(error => {
        console.error('Error logging in:', error.message);
    });
});

// Check local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        showCreateSection();
    } else {
        hideCreateSection();
    }
});
