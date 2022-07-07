const monthSelector = document.querySelector('#statementmonth');
monthSelector.value = new Date().toISOString().substring(0,7);


document.querySelector('#statementBtn').addEventListener('click', async (event) => {

    try {
        document.body.removeChild(document.querySelector('#tableDiv'));
    } catch (error) {
    }


    event.preventDefault();

    const tableDiv = document.createElement('div');
    tableDiv.id = "tableDiv";
    document.body.appendChild(tableDiv);

    const response =  await fetch(`/statement/getStatements?month=${monthSelector.value}`);
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
        heading_1.innerHTML = "Name";
        const heading_2 = document.createElement('th');
        heading_2.innerHTML = "Date";
        const heading_3 = document.createElement('th');
        heading_3.innerHTML = "Price";

        headings.appendChild(heading_1);
        headings.appendChild(heading_2);
        headings.appendChild(heading_3);
        thead.appendChild(headings);

        let totalPrice = 0;
        for (let i = 0; i < statements.length; i++) {
            //console.log(statements[i].totalprice);
            totalPrice += parseInt(statements[i].totalprice);


            // Creating and adding data to second row of the table
            const data = document.createElement('tr');
            const dataName = document.createElement('td');
            dataName.innerHTML = statements[i].clientname;
            const dataDate = document.createElement('td');
            dataDate.innerHTML = new Date(statements[i].appdate).toLocaleDateString();
            const dataPrice = document.createElement('td');
            dataPrice.innerHTML = "£" + statements[i].totalprice;

            data.appendChild(dataName);
            data.appendChild(dataDate);
            data.appendChild(dataPrice);
            tbody.appendChild(data);

        }

        const totalPriceEl = document.createElement('h3');
        totalPriceEl.innerHTML = "Total: £" + totalPrice;

        tableDiv.appendChild(totalPriceEl);

    }
    else {
        const noStatements = document.createElement('p');
        noStatements.innerHTML = "No statements for this month";
        tableDiv.appendChild(noStatements);
    }



})