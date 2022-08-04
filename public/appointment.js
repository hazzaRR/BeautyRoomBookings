import { getClients } from './reusable.js';


const client_selector = document.querySelector('#client_selector');
const date_selector = document.querySelector('#date');
const startTime_selector = document.querySelector('#start-time');
const endTime_selector = document.querySelector('#end-time');


//gets all the clients stored in the database when the page is loaded
document.addEventListener('DOMContentLoaded', await getClients.bind(event, document.querySelector('#client_selector')));


//allows the user to select treatments which is then highlighted to indicated its selected
const treatments = document.querySelectorAll('.treatment-li');
for (let i = 0; i < treatments.length; i++) {
    treatments[i].addEventListener('click', () => {
        treatments[i].classList.toggle('selected-treatment');
    });
};

//function that creates an appointment and posts it to the database
const createAppointment = async (event) => {

    event.preventDefault();

    const clientId = client_selector.value;
    const date = date_selector.value;
    const startTime = startTime_selector.value;
    const endTime = endTime_selector.value;
    let treatments = [];

    const selectedTreatments = document.querySelectorAll('.selected-treatment');

    for (let i = 0; i < selectedTreatments.length; i++) {
        treatments.push(selectedTreatments[i].id);
    }


    //create a new request object
    const newAppointment = {
        date,
        startTime,
        endTime,
        clientId,
        treatments
    };

    console.log(newAppointment);

    // turns newAppointment object into JSON string
    const serializedMessage = JSON.stringify(newAppointment);

    // posts JSON string to the server at the end point /appointment/createAppointment
    const response = await fetch('/appointment/createAppointment', { method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        body: serializedMessage
                    }
                )

    const json = await response.json();

    alert("Appointment has successfully been made");

    for (let i = 0; i < selectedTreatments.length; i++) {
        treatments.push(selectedTreatments[i].classList.toggle('selected-treatment'));
    };

    date_selector.value = '';
    startTime_selector.value = '';
    endTime_selector.value = '';

};


document.querySelector('#submitBtn').addEventListener('click', createAppointment);