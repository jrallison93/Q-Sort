function submitResults() {
    let results = {};
    const dropzones = document.querySelectorAll('.dropzone');
    
    dropzones.forEach((zone, index) => {
        const rank = index - 3; // Assuming -3 to +3 ranking
        results[rank] = [];
        zone.querySelectorAll('.statement').forEach(statement => {
            results[rank].push(statement.innerText);
        });
    });

    const participant = document.getElementById('participant').value;
    
    // Prepare the data to be sent to the Google Apps Script Web App.
    const formData = new FormData();
    formData.append('results', JSON.stringify(results));
    formData.append('participant', participant);

    // Submit the data via POST to your Apps Script URL
    fetch("https://docs.google.com/spreadsheets/d/1qVpxXHVRne58loOYUZBh3smgubT5kDSvltUid99TNKk/edit?gid=0#gid=0", {
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
