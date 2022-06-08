let startTime = null;
let endTime = null;
let date = null;

document.addEventListener('DOMContentLoaded', function() {
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
      dateClick: function(info) {
        date = info.dateStr;
        console.log(date);
        //calendar.changeView('timeGridDay', date);
        //alert('Clicked on: ' + info.dateStr);
        // change the day's background color just for fun
        //info.dayEl.style.backgroundColor = 'lightBlue';
      },
      select: function(info) {
        //alert(info.startStr  + " " + info.endStr);
        //appointmentBtn.style.display = "inline";
        console.log(info.startStr);
        console.log(info.endStr);
        appointmentBtn.disabled = false;
      },
      unselect: function(info) {
        appointmentBtn.disabled = true;
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

    const appointmentBtn = document.querySelector('.fc-addAppointmentBtn-button');
    appointmentBtn.disabled = true;

  });



