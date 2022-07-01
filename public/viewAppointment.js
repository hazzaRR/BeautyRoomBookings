import { getClients } from './reusable.js';
console.log("lucy bridle is fit asf");

//deletes an appointment from the database and all its associated treatments
const deleteAppBtn = document.querySelector('#deleteAppoint');
deleteAppBtn.addEventListener('click', async (event) => {

    if (confirm("Are you sure you want to delete") == true) {
        const appID = document.querySelector('#appID').innerHTML;

        console.log(appID.split("#")[1]);
        // posts JSON string to the server at the end point /appointment/createAppointment
        const response = await fetch(`/appointment/delete?id=${appID.split("#")[1]}`, { method: 'DELETE'})
    
        const json = await response.json();

        alert("Appointment has been deleted");
      } else {
        console.log("nothing to see here");
      }

});

const deleteTreatment = async (event) => {
    
    //gets the treatment id just selected
    const item = event.target;
    const treatment = item.parentElement;
    const treatmentID = treatment.childNodes[1].childNodes[1].innerHTML.split(" ")[1];

    //gets the appointment id
    let appID = document.querySelector('#appID').innerHTML;
    appID = appID.split("#")[1];

    const response = await fetch(`/appointment/deleteAppTreatment?appid=${appID}&treatmentid=${treatmentID}`, { method: 'DELETE'})

    const json = await response.json();

    alert("Treatment was Deleted");
    treatment.remove();
    
}

const deleteTreatmentButtons = document.getElementsByClassName('deleteTreatmentButton');
for (let i = 0; i < deleteTreatmentButtons.length; i++) {
    deleteTreatmentButtons[i].addEventListener('click', deleteTreatment);
}



//back button functionality, taking you back to the calendar view page
const backBtn = document.querySelector('#backBtn');
backBtn.addEventListener('click', () => {
    window.location.href = `/appointment`;
})

const updateAppointment = async () => {

    console.log("Hey")

    const clientName = document.querySelector('#cName');
    const cNameInput = document.createElement('select');
    cNameInput.id = 'cname';
    await getClients(cNameInput);

    for(let i = 0; i < cNameInput.options.length; i++) {
        if(cNameInput.options[i].innerHTML == clientName.innerHTML) {
            cNameInput.selectedIndex = i;
            break;
        }
    }

    const appDate = document.querySelector('#appDate');
    const dateInput = document.createElement('input');
    dateInput.id = 'appDate';
    dateInput.type = 'date';
    const [day, month, year] = appDate.innerHTML.split('/');
    dateInput.value =`${year}-${month}-${day}`;


    const startTime = document.querySelector('#startTime');
    const startInput = document.createElement('input');
    startInput.id = 'startTime';
    startInput.type = 'time';
    startInput.value = startTime.innerHTML;


    const endTime = document.querySelector('#endTime');
    const endInput = document.createElement('input');
    endInput.id = 'endTime';
    endInput.type = 'time';
    endInput.value = endTime.innerHTML;

    appDate.replaceWith(dateInput);
    startTime.replaceWith(startInput);
    endTime.replaceWith(endInput);
    clientName.replaceWith(cNameInput);

    document.querySelector('#backBtn').innerHTML = 'Cancel';
    document.querySelector('#backBtn').id = 'cancelChanges';
    document.querySelector('#EditAppoint').innerHTML = 'Confirm Changes';
    document.querySelector('#EditAppoint').removeEventListener('click', updateAppointment);
    document.querySelector('#EditAppoint').id = 'confirmChanges';

    document.querySelector('#deleteAppoint').remove();


    document.querySelector('#cancelChanges').addEventListener('click', () => {

        window.location.href = `/appointment/viewAppointment?id=${document.querySelector('#appID').innerHTML.split("#")[1]}`
    });

    document.querySelector('#confirmChanges').addEventListener('click', async (event) => {

        event.preventDefault();

        const id = document.querySelector('#appID').innerHTML.split("#")[1];
        const date = document.querySelector('#appDate').value;
        const startTime = document.querySelector('#startTime').value;
        const endTime = document.querySelector('#endTime').value;
        const clientid = document.querySelector('#cname').value;

        //create a new request object
        const updatedAppointment = {
            id,
            date,
            startTime,
            endTime,
            clientid
        };

        // turns newAppointment object into JSON string
        const serializedMessage = JSON.stringify(updatedAppointment);

        // posts JSON string to the server at the end point /appointment/createAppointment
        const response = await fetch('/appointment/updatedAppointment', { method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            body: serializedMessage
                        }
                    )

        const json = await response.json();

        window.location.href = `/appointment/viewAppointment?id=${document.querySelector('#appID').innerHTML.split("#")[1]}`

    });

};

//Edit button functionality, allowing you to update appointment details
document.querySelector('#EditAppoint').addEventListener('click', updateAppointment);