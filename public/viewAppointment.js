import { getClients } from './reusable.js';

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
    const treatmentID = treatment.id

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

    const clientName = document.querySelector('#cName');
    const cNameInput = document.createElement('select');
    cNameInput.id = 'cname';
    cNameInput.classList.add('field__input');
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
    dateInput.classList.add('field__input');
    const [day, month, year] = appDate.innerHTML.split('/');
    dateInput.value =`${year}-${month}-${day}`;


    const startTime = document.querySelector('#startTime');
    const startInput = document.createElement('input');
    startInput.id = 'startTime';
    startInput.type = 'time';
    startInput.classList.add('field__input');
    startInput.value = startTime.innerHTML;


    const endTime = document.querySelector('#endTime');
    const endInput = document.createElement('input');
    endInput.id = 'endTime';
    endInput.type = 'time';
    endInput.classList.add('field__input');
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



const showAvailableTreatments = async () => {

    let appID = document.querySelector('#appID').innerHTML;
    const response = await fetch(`/appointment/getAvailableTreatments?id=${appID.split("#")[1]}`);

    let treatments = await response.json();

    const sectionContainer = document.querySelector('.section-container');

    sectionContainer.innerHTML = "";

    const divContainer = document.createElement('div');
    //divContainer.classList.add('page');
    sectionContainer.appendChild(divContainer);


    const availableTreatments =  document.createElement("h4");
    availableTreatments.classList.add('treatmentTypes');
    availableTreatments.innerHTML = "Available Treatments";

    const treatmentUl =  document.createElement("ul");
    treatmentUl.classList.add("treatment-ul");

    divContainer.appendChild(availableTreatments);
    divContainer.appendChild(treatmentUl);



    const availableTreatmentsForm = document.createElement('form');
    availableTreatmentsForm.id = "avaTreatmentsContainer";

    for (let i = 0; i < treatments.length; i++) {

        const treatmentLi =  document.createElement("li");
        treatmentLi.classList.add("treatment-li");
        treatmentLi.id = treatments[i].id;
        
        const treatmentNameDiv = document.createElement('div');
        const treatmentNameH5 = document.createElement('H5');
        treatmentNameH5.innerHTML = treatments[i].treatmentname;
        treatmentNameH5.classList.add("treatmentname");
        treatmentNameDiv.appendChild(treatmentNameH5);

        const treatmentDetailsDiv = document.createElement('div');
        const treatmentNameSpan = document.createElement('span');
        treatmentNameSpan.classList.add('treatment-info');
        treatmentNameSpan.innerHTML = '£' + treatments[i].price;
        treatmentDetailsDiv.appendChild(treatmentNameSpan);
        
        treatmentUl.appendChild(treatmentLi);
        treatmentLi.appendChild(treatmentNameDiv);
        treatmentLi.appendChild(treatmentDetailsDiv);
        
        
        
        
        // const treatmentCheck =  document.createElement("INPUT");
        // treatmentCheck.setAttribute("type", "checkbox");
        // treatmentCheck.setAttribute('id',`treatment_${treatments[i].id}`);
        // treatmentCheck.setAttribute('name',`treatment_${treatments[i].id}`);
        // treatmentCheck.classList.add('treatment');
        
        // const treatmentNameLabel = document.createElement("label");
        // treatmentNameLabel.setAttribute('for',`treatment_${treatments[i].id}`);
        // treatmentNameLabel.innerHTML = treatments[i].treatmentname;
        // const treatmentSpan = document.createElement("span");
        // treatmentSpan.innerHTML = ` £${treatments[i].price}`;
        
        // // grab target element reference
        // const sumbitBtn = document.querySelector('#createClient');
        
        // // insert the element before target element
        // availableTreatmentsForm.appendChild(treatmentCheck);
        // availableTreatmentsForm.appendChild(treatmentNameLabel);
        // availableTreatmentsForm.appendChild(treatmentSpan);
        // availableTreatmentsForm.appendChild(document.createElement("br"));
    }

    const btnDivContainer = document.createElement('div');
    btnDivContainer.classList.add('page');
    sectionContainer.appendChild(btnDivContainer);
    
    const submitBtn = document.createElement('button');
    submitBtn.classList.add('button-31');
    submitBtn.id = 'addTreatmentsBtn';
    submitBtn.innerHTML = 'Add Treatments'
    btnDivContainer.appendChild(submitBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('button-31');
    cancelBtn.id = 'cancelBtn';
    cancelBtn.innerHTML = 'Cancel'
    btnDivContainer.appendChild(cancelBtn);
    

    treatments = document.querySelectorAll('.treatment-li');

    for (let i = 0; i < treatments.length; i++) {
        treatments[i].addEventListener('click', () => {
        treatments[i].classList.toggle('selected-treatment');
        });
    };


    // const submitBtn =  document.createElement("INPUT");
    // submitBtn.setAttribute("type", "submit");
    // submitBtn.id = "addTreatmentsBtn";

    // availableTreatmentsForm.appendChild(submitBtn);

    // document.body.appendChild(availableTreatmentsForm);


    submitBtn.addEventListener('click', async (event) => {

        event.preventDefault();
        const id = appID.split("#")[1];
        let treatments = [];

        //gets all the selected treatments
        let inputElements = document.getElementsByClassName('selected-treatment');
        for (let i=0; i < inputElements.length; i++) {
            treatments.push(inputElements[i].id);
        };

                //create a new request object
        const newTreatments = {
            id,
            treatments
        };

        //turns newAppointment object into JSON string
        const serializedMessage = JSON.stringify(newTreatments);

        // posts JSON string to the server at the end point /appointment/createAppointment
        const response = await fetch('/appointment/addTreatments', { method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            body: serializedMessage
                        }
                    )

        const json = await response.json();

        window.location.href = `/appointment/viewAppointment?id=${id}`


    })

    cancelBtn.addEventListener('click', async (event) => {

        const id = appID.split("#")[1];

        window.location.href = `/appointment/viewAppointment?id=${id}`
    });






    




};

document.querySelector('#addTreatment').addEventListener('click', showAvailableTreatments, {once : true});

