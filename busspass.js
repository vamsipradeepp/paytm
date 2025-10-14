document.addEventListener("DOMContentLoaded", function () {
  const seatAvailableEl = document.getElementById("isseatavailable");
  const isLadyEl = document.getElementById("areyoulady");
  const hasAadharEl = document.getElementById("haveaadhar");
  const checkButton = document.getElementById("checkStatus");
  const passengerStatus = document.getElementById("status");

  if (!seatAvailableEl || !isLadyEl || !hasAadharEl || !checkButton || !passengerStatus) {
    console.error("Required elements are missing in the DOM");
    return;
  }

  function updateStatus() {
    const isSeatAvailable = seatAvailableEl.checked;
    const isLady = isLadyEl.checked;
    const hasAadhar = hasAadharEl.checked;

    console.log(isSeatAvailable, isLady, hasAadhar);

    if (!isSeatAvailable) {
      passengerStatus.textContent = "No seats available";
      passengerStatus.style.color = "#b91c1c"; // red-700
      return;
    }

    if (!isLady) {
      passengerStatus.textContent = "Eligible only for women";
      passengerStatus.style.color = "#b45309"; // amber-700
      return;
    }

    if (!hasAadhar) {
      passengerStatus.textContent = "Aadhaar required";
      passengerStatus.style.color = "#b45309"; // amber-700
      return;
    }

    passengerStatus.textContent = "Seat confirmed";
    passengerStatus.style.color = "#065f46"; // emerald-800
  }

  checkButton.addEventListener("click", updateStatus);
});
