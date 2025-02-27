const statements = document.querySelectorAll('.statement');
const dropzones = document.querySelectorAll('.dropzone');

// Loop through all statements and add drag event listeners
statements.forEach(statement => {
    statement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', statement.innerText);
        statement.style.visibility = 'hidden'; // Make the statement hidden during drag
    });

    statement.addEventListener('dragend', () => {
        statement.style.visibility = 'visible'; // Make the statement visible after drag ends
    });
});

// Loop through all dropzones and add dragover and drop event listeners
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();  // Allow dropping in the dropzone
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const text = e.dataTransfer.getData('text/plain');

        const maxItems = parseInt(dropzone.getAttribute('data-max'));
        const currentItems = dropzone.querySelectorAll('.statement').length;

        // Add statement if the dropzone isn't full
        if (currentItems < maxItems && !Array.from(dropzone.children).some(child => child.innerText === text)) {
            const newStatement = document.createElement('div');
            newStatement.classList.add('statement');
            newStatement.textContent = text;
            newStatement.draggable = true;
            dropzone.appendChild(newStatement);
        }

        // Optional: Add the full-dropzone style if max is exceeded
        if (currentItems >= maxItems) {
            dropzone.classList.add('full-dropzone');
            setTimeout(() => dropzone.classList.remove('full-dropzone'), 1000);
        }
    });
});

// Function to collect the results and submit them
function submitResults() {
    const results = {};
    
    dropzones.forEach((zone, index) => {
        const rank = index - 3; // Assign rankings from -3 to +3
        results[rank] = [];
        zone.querySelectorAll('.statement').forEach(statement => {
            results[rank].push(statement.innerText);
        });
    });

    // Get the participant identifier
    const participant = document.getElementById('participant').value;
    if (!participant) {
        alert('Please enter a participant identifier.');
        return; // Prevent form submission if participant ID is empty
    }

    // Set the results and participant data in the hidden form
    document.getElementById('results').value = JSON.stringify(results);
    document.getElementById('hidden-participant').value = participant;
    
    // Submit the form to Google Apps Script
    document.getElementById('qsortForm').submit();

    alert("Your responses have been submitted!");
}
