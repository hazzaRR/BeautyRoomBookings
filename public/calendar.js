let startTime = null;
let endTime = null;
let date = null;

async function getAllAppointments() {

  const response = await fetch('/appointment/getAppointments');

  const appointments = await response.json();

  return appointments;
}

document.addEventListener('DOMContentLoaded', async function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      firstDay: 1,
      slotMinTime: '07:00',
      slotMaxTime: '21:00',
      slotDuration: '00:15',
      nowIndicator: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'addAppointmentBtn dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      dateClick: function(info) {
        date = info.dateStr;
        console.log(date);
        calendar.changeView('timeGridDay', date);
        //alert('Clicked on: ' + info.dateStr);
        // change the day's background color just for fun
        //info.dayEl.style.backgroundColor = 'lightBlue';
      },
      // select: function(info) {
      //   //alert(info.startStr  + " " + info.endStr);
      //   //appointmentBtn.style.display = "inline";
      //   console.log(info.startStr);
      //   console.log(info.endStr);
      //   appointmentBtn.disabled = false;
      // },
      unselect: function(info) {
        appointmentBtn.disabled = true;
      },
      eventClick: function(info) {
        window.location.href = `/appointment/viewAppointment?id=${info.event.id}`;
        //alert('Event: ' + info.event.id);
        // change the border color just for fun
        info.el.style.borderColor = 'red';
      },
      customButtons: {
        addAppointmentBtn: {
          text: 'New Appointment',
          click: function(info) {
            // var dateStr = prompt('Enter a date in YYYY-MM-DD format');
            // var date = new Date(dateStr + 'T00:00:00'); // will be in local time

            if (date === null) {
                alert('Please select a date');
            }

            else {
                alert(date);
                calendar.changeView('timeGridDay');
            }
  
            // if (!isNaN(date.valueOf())) { // valid?
            //   calendar.addEvent({
            //     title: 'dynamic event',
            //     start: date,
            //     allDay: true
            //   });
            //   alert('Great. Now, update your database...');
            // } else {
            //   alert('Invalid date.');
            // }
        }
    }
    }
    });
    calendar.render();

    const appointments = await getAllAppointments();

   // console.log(appointments)

    for (let i = 0; i < appointments.length; i++) {

      let d = new Date(appointments[i].appdate);
      calendar.addEvent({
        id: appointments[i].id,
        title: appointments[i].title,
        start: d.setHours(parseInt(appointments[i].starttime.substring(0,2)), parseInt(appointments[i].starttime.substring(3,5)), parseInt(appointments[i].starttime.substring(6,8))),
        end: d.setHours(parseInt(appointments[i].endtime.substring(0,2)), parseInt(appointments[i].endtime.substring(3,5)), parseInt(appointments[i].endtime.substring(6,8)))
      })

      // const startTime = new Date(appointments[i].appdate).toLocaleDateString() + 'T' + appointments[i].starttime;
      // const endTime = new Date(appointments[i].appdate).toLocaleDateString() + 'T' + appointments[i].endtime;
      // console.log(startTime.replaceAll('/', '-'));

    }


    const appointmentBtn = document.querySelector('.fc-addAppointmentBtn-button');
    appointmentBtn.disabled = true;

  });



