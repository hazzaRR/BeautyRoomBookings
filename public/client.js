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