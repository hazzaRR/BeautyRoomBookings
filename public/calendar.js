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
      },
      eventClick: function(info) {
        window.location.href = `/appointment/viewAppointment?id=${info.event.id}`;
      },
      customButtons: {
        addAppointmentBtn: {
          text: 'New Appointment',
          click: function(info) {
            window.location.href = '/appointment/createAppointment';
          }
        }
      }
    });
    calendar.render();

    const appointments = await getAllAppointments();

    for (let i = 0; i < appointments.length; i++) {

      let d = new Date(appointments[i].appdate);
      calendar.addEvent({
        id: appointments[i].id,
        title: appointments[i].title,
        start: d.setHours(parseInt(appointments[i].starttime.substring(0,2)), parseInt(appointments[i].starttime.substring(3,5)), parseInt(appointments[i].starttime.substring(6,8))),
        end: d.setHours(parseInt(appointments[i].endtime.substring(0,2)), parseInt(appointments[i].endtime.substring(3,5)), parseInt(appointments[i].endtime.substring(6,8)))
      })
    }

    const appointmentBtn = document.querySelector('.fc-addAppointmentBtn-button');

  });



