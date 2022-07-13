const treatments = document.querySelectorAll('.treatment-li');

for (let i = 0; i < treatments.length; i++) {
    treatments[i].addEventListener('click', function () {
        treatments[i].classList.toggle('selected-treatment');
        console.log("Hi");
    });

}