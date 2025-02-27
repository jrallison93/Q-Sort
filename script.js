function submitResults() {
    let results = {};
    const dropzones = document.querySelectorAll('.dropzone');

    // Loop through the dropzones and gather the rankings
    dropzones.forEach((zone, index) => {
        const rank = index - 3; // Assuming -3 to +3 ranking
        results[rank] = [];
        zone.querySelectorAll('.statement').forEach(statement => {
            results[rank].push(statement.innerText);
        });
    });

    // Get the participant identifier
    const participant = document.getElementById('participant').value;
    
    // Prepare the data to be sent to the Google Apps Script Web App.
    const formData = new FormData();
    formData.append('results', JSON.stringify(results));
    formData.append('participant', participant);

    // Make sure to use your correct Google Apps Script URL
    const googleAppsScriptUrl = "https://script.google.com/macros/s/AKfycbye60wRTM8M2hFxBEQa_tx67fZ0TG5EAdjLP4NC11-USKvwc2ghRfvLU0v47aJfvFFL/exec";

    // Submit the data via POST to your Apps Script Web App
    fetch(googleAppsScriptUrl, {
        method: "POST",
        body: formData,
    })
    .then(response => response.text())
    .then(result => {
        alert("Your responses have been submitted!");
    })
    .catch(error => {
        alert("Error: " + error.message);
    });
}
