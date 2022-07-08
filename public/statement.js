const startDate = document.querySelector('#start-date');
const endDate = document.querySelector('#end-date');
startDate.value = new Date().toISOString().substring(0,10);
endDate.value = new Date().toISOString().substring(0,10);


document.querySelector('#statementBtn').addEventListener('click', async (event) => {

    try {
        document.body.removeChild(document.querySelector('#tableDiv'));
    } catch (error) {
    }

    event.preventDefault();

    const tableDiv = document.createElement('div');
    tableDiv.id = "tableDiv";
    document.body.appendChild(tableDiv);

    const response =  await fetch(`/statement/getStatements?start=${startDate.value}&end=${endDate.value}`);
    const statements = await response.json();

    if (statements.length > 0) {


        const table = document.createElement('table');
        table.id = "statementTable";
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        // Adding the entire table to the body tag
        tableDiv.appendChild(table);


        // Creating and adding data to first row of the table
        const headings = document.createElement('tr');
        const heading_1 = document.createElement('th');
        heading_1.innerHTML = "id";
        const heading_2 = document.createElement('th');
        heading_2.innerHTML = "Name";
        const heading_3 = document.createElement('th');
        heading_3.innerHTML = "Treatment";
        const heading_4 = document.createElement('th');
        heading_4.innerHTML = "Date";
        const heading_5 = document.createElement('th');
        heading_5.innerHTML = "Treatment Price";
        headings.appendChild(heading_1);
        headings.appendChild(heading_2);
        headings.appendChild(heading_3);
        headings.appendChild(heading_4);
        headings.appendChild(heading_5);
        thead.appendChild(headings);

        let totalPrice = 0;
        for (let i = 0; i < statements.length; i++) {
            //console.log(statements[i].totalprice);
            totalPrice += parseInt(statements[i].price);


            // Creating and adding data to second row of the table
            const data = document.createElement('tr');
            const dataID = document.createElement('td');
            dataID.innerHTML = statements[i].id;
            const dataName = document.createElement('td');
            dataName.innerHTML = statements[i].clientname;
            const dataTreatment = document.createElement('td');
            dataTreatment.innerHTML = statements[i].treatmentname;
            const dataDate = document.createElement('td');
            dataDate.innerHTML = new Date(statements[i].appdate).toLocaleDateString();
            const dataTreatmentPrice = document.createElement('td');
            dataTreatmentPrice.innerHTML = "£" + statements[i].price + "/£" + statements[i].totalprice;

            data.appendChild(dataID);
            data.appendChild(dataName);
            data.appendChild(dataTreatment);
            data.appendChild(dataDate);
            data.appendChild(dataTreatmentPrice);
            tbody.appendChild(data);

        }

        const totalPriceEl = document.createElement('h3');
        totalPriceEl.innerHTML = "Total: £" + totalPrice;

        tableDiv.appendChild(totalPriceEl);

    }
    else {
        const noStatements = document.createElement('p');
        noStatements.innerHTML = "No statements for the given date range";
        tableDiv.appendChild(noStatements);
    }



});