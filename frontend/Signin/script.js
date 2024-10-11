function togglePass() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye img');

    // Check the current type of the password input
    if (passwordInput.type === 'password') {
        // Change the type to text to show the password
        passwordInput.type = 'text';
        // Optionally change the eye icon to indicate that the password is visible
        eyeIcon.src = './eye-open.svg'; // Update the icon to an open eye
    } else {
        // Change the type back to password to hide it
        passwordInput.type = 'password';
        // Optionally change the eye icon back to indicate that the password is hidden
        eyeIcon.src = './eye-close.svg'; // Update the icon to a closed eye
    }
}