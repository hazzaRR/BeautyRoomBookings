// const newClientbutton = document.querySelector('#createClient');


// newClientbutton.disabled = true;
// newClientbutton.addEventListener('submit', newClient);

// async function newClient(event) {
//     event.preventDefault();
//     const getForm = document.querySelector('#clientForm');


//     const clientToAdd = {
//         name: getForm.elements.namedItem('name').value,
//         email: getForm.elements.namedItem('email').value,
//         telephone: getForm.elements.namedItem('number').value,
//     };

//     const serializedMessage = JSON.stringify(clientToAdd);
//     const response = await fetch('/client', { method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: serializedMessage
//         }
//     );

//     console.log(response.json);

// };


async function getAllClients(event) {
    event.preventDefault();


    const response = await fetch('/client');

    const clients = response.json;

    for (let i = 0; i < clients.length; i++) {
        console.log(clients[i]);
    }

};

const clientContainer = document.querySelector('.clientContainer');

clientContainer.addEventListener('DOMContentLoaded', getAllClients);