var doctorAvailability = {};

var startDate = new Date("2024-04-23");
var endDate = new Date("2024-04-29");

for (var currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
    var dateStr = currentDate.toISOString().split('T')[0];
    doctorAvailability[dateStr] = {
        "9:00": ["doc1", "doc2"],
        "10:00": ["doc1", "doc3"],
        "11:00": ["doc2", "doc4"],
    };
}

function updateDoctorOptions() {
    var date = document.getElementById("appointment-date").value;
    var time = document.getElementById("preferred-time").value;
    var doctorSelect = document.getElementById("doctor");
    doctorSelect.innerHTML = "";

    if (doctorAvailability[date] && doctorAvailability[date][time]) {
        var availableDoctors = doctorAvailability[date][time];
        availableDoctors.forEach(function(doctor) {
            var option = document.createElement("option");
            option.text = doctor;
            option.value = doctor;
            doctorSelect.add(option);
        });
    } else {
        var option = document.createElement("option");
        option.text = "Please select date and time to see available Doctors";
        doctorSelect.add(option);
    }
}

document.getElementById("appointment-date").addEventListener("change", updateDoctorOptions);
document.getElementById("preferred-time").addEventListener("change", updateDoctorOptions);

updateDoctorOptions();

function displayAppointmentDetails() {
    var patient = document.getElementById("fullname").value;
    var date = document.getElementById("appointment-date").value;
    var time = document.getElementById("preferred-time").value;
    var doctor = document.getElementById("doctor").value;

    var details = "You have booked an appointment on " + date + " at " + time + " with Dr. " + doctor;
    document.getElementById("appointment-details").innerText = details;

    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("appointment-details").classList.remove("hidden");
}

document.getElementById("appointment-form").addEventListener("submit", function (event) {
    event.preventDefault();
    displayAppointmentDetails();
});
