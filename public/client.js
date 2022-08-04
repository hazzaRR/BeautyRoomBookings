//redirects you to the add client form when the add client button is pressed
document.querySelector('#addClient').addEventListener('click', (event) => {

    window.location.href = '/client/newClient';
});


//deletes the selected client from the database
const deleteClient = async (event) => {
    
    //gets the treatment id just selected
    const item = event.target;
    const client = item.parentElement;
    const clientID = client.id

    console.log(clientID);

    const response = await fetch(`/client?id=${clientID}`, { method: 'DELETE'})

    const json = await response.json();

    alert("Client was Deleted");
    client.remove();
    
}

//adds eventlisteners to all the client divs for the deleteclient function
const deleteClientButtons = document.getElementsByClassName('deleteClientButton');
for (let i = 0; i < deleteClientButtons.length; i++) {
    deleteClientButtons[i].addEventListener('click', deleteClient);
}

//function that allows to update client details
const editClient = async (event) => {

    const item = event.target;
    const client = item.parentElement;
    const clientID = client.id
    
    //gets the treatment id just selected and redirects to a form that you can edit that clients details
    window.location.href = `/client/updateClient?id=${clientID}`
    
}

//adds eventlisteners to all the client divs for the editclient function
const editClientButtons = document.getElementsByClassName('editClientButton');
for (let i = 0; i < editClientButtons.length; i++) {
    editClientButtons[i].addEventListener('click', editClient);
}