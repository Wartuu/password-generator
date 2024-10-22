
const copy = document.getElementById("copy");
const passwordDisplay = document.getElementById("newpassword");

const specialCharacters = document.getElementById("special");
const numbers = document.getElementById("numbers");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");

const sliderText = document.getElementById("size-text");
const slider = document.getElementById("size");

const generate = document.getElementById("generate");

const specialTable = "!@#$%^&*()_+{}[];':./><?\\|`~";
const numberTable = "0987654321";
const upperTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerTable = "abcdefghijklmnopqrstuvwxyz";


// init
sliderText.innerHTML = `size (${slider.value}):`;

const copyToClipboard = () => {
    passwordDisplay.select();
    passwordDisplay.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(passwordDisplay.value);
}


copy.addEventListener("click", copyToClipboard);
passwordDisplay.addEventListener("click", copyToClipboard);


slider.addEventListener("input", () => {
    sliderText.innerHTML = `size (${slider.value}):`;
});


var countTo = slider.value;
var counter = 0;



generate.addEventListener("click", () => {
    const special = specialCharacters.checked;
    const num = numbers.checked;
    const up = uppercase.checked;
    const low = lowercase.checked;

    let allChars = '';

    if(special) allChars += specialTable;
    if(num) allChars += numberTable;
    if(up) allChars += upperTable;
    if(low) allChars += lowerTable;

    if(allChars.length === 0) {
        alert('You need to select at least one character type!');
        return;
    }

    let password = '';
    for(let i = 0; i < slider.value; i++) {
        const index = Math.floor(Math.random() * allChars.length);
        password += allChars[index];
    }

    passwordDisplay.value = "";

    
    passwordDisplay.style.fontSize = Math.min(500 / password.length, 15)  + "px"
    animatePassword(password);

});

function animatePassword(pass) {
    let index = 0;
    const interval = setInterval(() => {
        passwordDisplay.value += pass[index++];
        if(index >= pass.length) {
            clearInterval(interval);
        }
    }, 250 / pass.length)
}