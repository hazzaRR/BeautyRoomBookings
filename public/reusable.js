export async function getClients(clientSelector) {
    
    const response =  await fetch('/client/getClients');
    const clients = await response.json();

    clients.forEach(client => addOptions(client, clientSelector)); // add new select option for each car park
};

export function addOptions(client, selector)
{
    const option = document.createElement("option");
    option.value = client.id;
    option.text = client.clientname;
    selector.add(option);
};