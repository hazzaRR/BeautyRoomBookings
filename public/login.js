//function runs whenever a form is submitted sends it to server to check if the email and password are correct
async function loginAttempt(event) {
    event.preventDefault();

    //selects the form element from form.hmtl
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    //create a new object that stores email and password
    const loginCreds = {
        username: username.value,
        password: password.value,
    };

    // turns loginCreds object into JSON string
    const serializedMessage = JSON.stringify(loginCreds);

    // posts JSON string to the server at the end point /login
    const response = await fetch('/login', { method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        body: serializedMessage
                    }
                )

    const json = await response.json();


    //if login was successful add token is added to the localStorage
    if (response.status === 200) {
        
        try
        {
            localStorage.setItem('accessToken', json.accessToken)
            document.cookie = "token="+json.accessToken;
            
            console.log("user in session storage");

            window.location.href = "/home";
        }
        catch{
            console.log("Err: could not save token to local storage")
        }
    }
    else {

        try {
            const incorrectDetails = document.getElementById('incorrectDetails');
            incorrectDetails.remove();
        }
        catch {

        }
        const incorrectDetails = document.createElement('p');
        incorrectDetails.setAttribute('id', 'incorrectDetails');
        incorrectDetails.innerText = json;
        document.getElementById('loginContainer').appendChild(incorrectDetails);

        document.getElementById('password').value = ''; 
    }

}

//Selects form element from form.html and adds a loginAttempt event listener

const form = document.querySelector('#loginForm');
form.addEventListener('submit', loginAttempt);
