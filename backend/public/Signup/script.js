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
const firstName = document.getElementById('f_name')
const lastName = document.getElementById('l_name')
const password = document.getElementById('password')

const submit = document.querySelector('.btn')

console.log(submit)

submit.addEventListener('click', async (e) => {

    e.preventDefault();

   const res =  await axios.post("https://taskly-6y3t.onrender.com/api/v1/user/signup", {
        email : email.value , password : password.value, firstName : firstName.value, lastName : lastName.value
    });

    console.log(res)

    alert('singuppppp')
})

console.log(email.value, firstName.value, lastName.value)