document.querySelector('#updateClient').addEventListener('click', async (event) => {

    const clientID = document.querySelector('#id');
    const clientName = document.querySelector('#name');
    const clientEmail = document.querySelector('#email');
    const clientNumber = document.querySelector('#number');

    const updateClient = {
        id: clientID.innerHTML,
        name: clientName.value,
        email: clientEmail.value,
        telephone: clientNumber.value

    }

    console.log(updateClient);

     //turns newclient object into JSON string
     const serializedMessage = JSON.stringify(updateClient);

     // posts JSON string to the server at the end point /client
     const response = await fetch('/client', { method: 'PUT',
                             headers: {
                                 'Content-Type': 'application/json'
                             },
                         body: serializedMessage
                     }
                 )

     const json = await response.json();

    window.location.href = '/client';
});


document.querySelector('#back').addEventListener('click', () => {

    window.location.href = '/client';

});