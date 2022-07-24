//back button functionality, taking you back to the treatment selector page
const backBtn = document.querySelector('#backBtn');
backBtn.addEventListener('click', () => {
    window.location.href = `/treatment`;
});


const updateTreatment = async () => {
    const treatmentTypeSpan = document.querySelector('#treatmentType');
    const treatmentTypeInput = document.createElement('input');
    treatmentTypeInput.id = 'treatmentType';
    treatmentTypeInput.type = 'text';
    treatmentTypeInput.classList.add('field__input');
    treatmentTypeInput.value = treatmentTypeSpan.innerHTML;
    
    const treatmentNameSpan = document.querySelector('#treatmentName');
    const treatmentNameInput = document.createElement('input');
    treatmentNameInput.id = 'treatmentName';
    treatmentNameInput.type = 'text';
    treatmentNameInput.classList.add('field__input');
    treatmentNameInput.value =treatmentNameSpan.innerHTML;


    const priceSpan = document.querySelector('#price');
    const priceInput = document.createElement('input');
    priceInput.id = 'price';
    priceInput.type = 'text';
    priceInput.classList.add('field__input');
    priceInput.value = priceSpan.innerHTML;

    treatmentNameSpan.replaceWith(treatmentNameInput);
    treatmentTypeSpan.replaceWith(treatmentTypeInput);
    priceSpan.replaceWith(priceInput);

    document.querySelector('#backBtn').innerHTML = 'Cancel';
    document.querySelector('#backBtn').id = 'cancelChanges';
    document.querySelector('#editTreatment').innerHTML = 'Confirm Changes';
    document.querySelector('#editTreatment').removeEventListener('click', updateTreatment);
    document.querySelector('#editTreatment').id = 'confirmChanges';

    document.querySelector('#deleteTreatment').remove();


    document.querySelector('#cancelChanges').addEventListener('click', () => {

        window.location.href = `/treatment/viewTreatment?id=${document.querySelector('#treatmentID').innerHTML.split("#")[1]}`
    });

    document.querySelector('#confirmChanges').addEventListener('click', async (event) => {

        event.preventDefault();

        const id = document.querySelector('#treatmentID').innerHTML.split("#")[1];
        const name = document.querySelector('#treatmentName').value;
        const type = document.querySelector('#treatmentType').value;
        const price = document.querySelector('#price').value;

        //create a new request object
        const updatedTreatmentDetails = {
            id,
            name,
            type,
            price
        };

        console.log(updatedTreatmentDetails);

        // turns newAppointment object into JSON string
        const serializedMessage = JSON.stringify(updatedTreatmentDetails);

        // posts JSON string to the server at the end point /treatment/updatedTreatment
        const response = await fetch('/treatment/updatedTreatment', { method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            body: serializedMessage
                        }
                    )

        const json = await response.json();

        window.location.href = `/treatment/viewTreatment?id=${document.querySelector('#treatmentID').innerHTML.split("#")[1]}`

    });

};

//Edit button functionality, allowing you to update treatment details
document.querySelector('#editTreatment').addEventListener('click', updateTreatment);



const deleteTreatment = async () => {
    const id = document.querySelector('#treatmentID').innerHTML.split("#")[1];

    // posts JSON string to the server at the end point /treatment
    const response = await fetch(`/treatment?id=${id}`, { method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
    })

    const json = await response.json();
    console.log(json);

    window.location.href = `/treatment`;

};

//delete button functionality, allowing you to delete treatments
document.querySelector('#deleteTreatment').addEventListener('click', deleteTreatment);

