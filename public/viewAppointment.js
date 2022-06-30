console.log("lucy bridle is fit asf");

//deletes an appointment from the database and all its associated treatments
const deleteAppBtn = document.querySelector('#deleteAppoint');
deleteAppBtn.addEventListener('click', async (event) => {

    if (confirm("Are you sure you want to delete") == true) {
        const appID = document.querySelector('#appID').innerHTML;

        console.log(appID.split("#")[1]);
        // posts JSON string to the server at the end point /appointment/createAppointment
        const response = await fetch(`/appointment/delete?id=${appID.split("#")[1]}`, { method: 'DELETE'})
    
        const json = await response.json();

        alert("Appointment has been deleted");
      } else {
        console.log("nothing to see here");
      }

});

const deleteTreatment = async (event) => {

        //gets the treatment id just selected
        const item = event.target;
        const treatment = item.parentElement;
        const treatmentID = treatment.childNodes[1].childNodes[1].innerHTML.split(" ")[1];

        //gets the appointment id
        let appID = document.querySelector('#appID').innerHTML;
        appID = appID.split("#")[1];

        const response = await fetch(`/appointment/deleteAppTreatment?appid=${appID}&treatmentid=${treatmentID}`, { method: 'DELETE'})
    
        const json = await response.json();

        alert("Treatment was Deleted");
        treatment.remove();
}

const deleteTreatmentButtons = document.getElementsByClassName('deleteTreatmentButton');
for (let i = 0; i < deleteTreatmentButtons.length; i++) {
    deleteTreatmentButtons[i].addEventListener('click', deleteTreatment);
}



//back button functionality, taking you back to the calendar view page
const backBtn = document.querySelector('#backBtn');
backBtn.addEventListener('click', () => {
    window.location.href = `/appointment`;
})