// This function will run when the results are submitted.
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

    // Google Apps Script URL
    const googleAppsScriptUrl = "https://script.google.com/macros/s/AKfycbzqayNc8OxC5Kbs9eJlrKDBwFxU_hcneEzmsXutDNFIZASO6CdgO8ittM0UDqBkT9_2kw/exec";

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

// Mark the statement as used when it's dropped into a dropzone
const statements = document.querySelectorAll('.statement');
const dropzones = document.querySelectorAll('.dropzone');

// Loop through all statements and add drag event listeners
statements.forEach(statement => {
    statement.addEventListener('dragstart', (e) => {
        // Allow only draggable statements that are not 'used'
        if (statement.classList.contains('used')) {
            e.preventDefault();  // Don't allow drag if it's already used
            return;
        }

        e.dataTransfer.setData('text/plain', statement.innerText);
        setTimeout(() => statement.style.display = 'none', 0); // Hide the statement while dragging
    });

    statement.addEventListener('dragend', () => {
        statement.style.display = 'block'; // Show the statement again after dragging
    });
});

// Loop through all dropzones and add dragover and drop event listeners
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow the drop
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const text = e.dataTransfer.getData('text/plain');
        const statementToDrop = Array.from(statements).find(statement => statement.innerText === text);

        // If the statement is valid and not yet placed, process the drop
        if (statementToDrop && !statementToDrop.classList.contains('used')) {
            // Mark the statement as used
            statementToDrop.classList.add('used');
            statementToDrop.setAttribute('draggable', 'true');  // Enable dragging once placed in a dropzone

            // Remove from any other dropzone first
            const currentDropzone = statementToDrop.parentElement;
            if (currentDropzone && currentDropzone !== dropzone) {
                currentDropzone.removeChild(statementToDrop);  // Remove from the old dropzone
            }

            // Create a new statement div and append it to the new dropzone
            const newStatement = document.createElement('div');
            newStatement.classList.add('statement');
            newStatement.textContent = text;
            newStatement.draggable = true;  // Allow dragging this new statement in the new dropzone
            dropzone.appendChild(newStatement);

            // Optionally, add a style to indicate it's been placed
            dropzone.classList.add('full-dropzone');

            // Reset the dropzone style after a short delay
            setTimeout(() => dropzone.classList.remove('full-dropzone'), 1000);
        }
    });
});
