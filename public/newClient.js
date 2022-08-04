document.querySelector('#createClient').addEventListener('click', async (event) => {

    const clientName = document.querySelector('#name');
    const clientEmail = document.querySelector('#email');
    const clientNumber = document.querySelector('#number');

    const newClient = {
        name: clientName.value,
        email: clientEmail.value,
        telephone: clientNumber.value

    }

     //turns newclient object into JSON string
     const serializedMessage = JSON.stringify(newClient);

     // posts JSON string to the server at the end point /client
     const response = await fetch('/client', { method: 'POST',
                             headers: {
                                 'Content-Type': 'application/json'
                             },
                         body: serializedMessage
                     }
                 )

     const json = await response.json();

    window.location.href = '/client';
});