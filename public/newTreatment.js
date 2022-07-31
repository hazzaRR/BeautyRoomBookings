const addTreatmentBtn = document.querySelector('#createTreatment');


addTreatmentBtn.addEventListener('click', async () => {

    const TreatmentName = document.querySelector('#name');
    const TreatmentType = document.querySelector('#type');
    const TreatmentPrice = document.querySelector('#price');

    const newTreatment = {
        name: TreatmentName.value,
        type: TreatmentType.value,
        price: TreatmentPrice.value
    };

     // turns newTreatment object into JSON string
     const serializedMessage = JSON.stringify(newTreatment);

     // posts JSON string to the server at the end point /treatment/updatedTreatment
     const response = await fetch('/treatment/createTreatment', { method: 'POST',
                             headers: {
                                 'Content-Type': 'application/json'
                             },
                         body: serializedMessage
                     }
                 )

     const json = await response.json();

     TreatmentName.value = "";
     TreatmentType.value = "";
     TreatmentPrice.value = "";

     alert("Treatment has successfully been made");

});

const backBtn = document.querySelector('#backBtn');
backBtn.addEventListener('click', () => window.location.href = '/treatment');