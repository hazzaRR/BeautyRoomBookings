const form = document.querySelector('#appointmentForm');

async function getTreatments() {
    

    const response =  await fetch('/treatment/getTreatments');
    const treatments = await response.json();



    for(let i = 0; i < treatments.length; i++) {
        console.log(treatments[i].treatmentname);


        const treatmentCheck =  document.createElement("INPUT");
        treatmentCheck.setAttribute("type", "checkbox");
        treatmentCheck.setAttribute('id',`treatment_${treatments[i].id}`);
        treatmentCheck.setAttribute('name',`treatment_${treatments[i].id}`);
        treatmentCheck.classList.add('treatment');

        const treatmentNameLabel = document.createElement("label");
        treatmentNameLabel.setAttribute('for',`treatment_${treatments[i].id}`);
        treatmentNameLabel.innerHTML = treatments[i].treatmentname;

        // treatmentCheck.innerHTML = treatments[i].treatmentname;

        // grab target element reference
        const sumbitBtn = document.querySelector('#createClient');

        // insert the element before target element
        form.insertBefore(treatmentCheck, sumbitBtn);
        form.insertBefore(treatmentNameLabel, sumbitBtn);
        form.insertBefore(document.createElement("br"), sumbitBtn);
        //form.appendChild(treatmentCheck);
        //form.appendChild(treatmentNameLabel);    
        //form.appendChild(document.createElement("br"));

    }




};


async function getClients() {
    

    const response =  await fetch('/client/getClients');
    const clients = await response.json();

    const clientSelector = document.querySelector('#client_selector');

    clients.forEach(client => addOptions(client, clientSelector)); // add new select option for each car park
};

async function createAppointment(event) {

    event.preventDefault();

    const clientId = document.getElementById('client_selector').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    let treatments = [];

    //gets all the selected treatments
    let inputElements = document.getElementsByClassName('treatment');
    for (let i=0; i < inputElements.length; i++){
      if(inputElements[i].checked) {
        treatments.push(inputElements[i].id.substring(10));
      }
    };

    //create a new request object
    const newAppointment = {
        date,
        startTime,
        endTime,
        clientId,
        treatments
    };

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
    form.reset();

};


//adds the clients to the select tag 
function addOptions(client, selector)
{
    const option = document.createElement("option");
    option.value = client.id;
    option.text = client.clientname;
    selector.add(option);
}


document.addEventListener('DOMContentLoaded', getTreatments);
document.addEventListener('DOMContentLoaded', getClients);

form.addEventListener('submit', createAppointment);



