let contactForm = document.querySelector("#contactForm");

let name = document.querySelector("#name");
let email = document.querySelector('#email');
let phone = document.querySelector('#phone');
let custLocation = document.querySelector('#location');
let message = document.querySelector("#message");
let sentFrom = window.location.href;

let contactInfo = document.querySelector(".contactMessage");

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        location: custLocation.value,
        message: message.value,
        sentFrom: sentFrom
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/contact", true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("SameSite", "None");
    xhr.onload = function () {
        if (xhr.responseText == "success") {
            name.value = "";
            email.value = "";
            phone.value = "";
            custLocation.value = "";
            message.value = "";

            contactInfo.innerHTML = "Thank you for messaging us. We will get back to you as soon as possible!";
            contactInfo.classList.add("contactFormSuccess");

        } else {
            contactInfo.innerHTML = "Unfortunately the message didn't go through. Please try calling us instead!";
            contactInfo.classList.add("contactFormFail");
        }
    }

    xhr.send(JSON.stringify(formData));
})

/* modal */
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})