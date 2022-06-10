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

    clients.forEach(client => addOptions(client.clientname, clientSelector)); // add new select option for each car park


    for(let i = 0; i < clients.length; i++) {
        console.log(clients[i]);

        // clients.forEach(client => addOptions(client.clientname, clientSelector)); // add new select option for each car park


        // const treatmentCheck =  document.createElement("INPUT");
        // treatmentCheck.setAttribute("type", "checkbox");
        // treatmentCheck.setAttribute('id',`treatment_${treatments[i].id}`);
        // treatmentCheck.setAttribute('name',`treatment_${treatments[i].id}`);
        // treatmentCheck.classList.add('treatment');

        // const treatmentNameLabel = document.createElement("label");
        // treatmentNameLabel.setAttribute('for',`treatment_${treatments[i].id}`);
        // treatmentNameLabel.innerHTML = treatments[i].treatmentname;



    }




};


//adds the carpark options to the select tag 
function addOptions(client, selector)
{
    const option = document.createElement("option");
    option.value = client;
    option.text = client;
    selector.add(option);
}


//document.addEventListener('DOMContentLoaded', getTreatments);
document.addEventListener('DOMContentLoaded', getClients);



