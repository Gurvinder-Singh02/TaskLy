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


const email = document.getElementById('email')
const password = document.getElementById('password')

const submit = document.querySelector('.btn')

console.log(submit)


submit.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        // Make the POST request to sign in
        let res = await axios.post("https://taskly-6y3t.onrender.com/api/v1/user/signin", {
            email: email.value,
            password: password.value
        });

        console.log(res);
        // Check if the response has the token
        if (res.data && res.data.token) {
            console.log("in data");

            // Save the token in localStorage (or sessionStorage)
            window.localStorage.setItem('token', res.data.token);

            window.location.href = '/home';
        } else {
            // Handle the case where there is no token
            console.error('Token not found in response');
        }
    } catch (error) {
        console.error('Error during sign in:', error);
        // You might want to show an error message to the user
    }
});