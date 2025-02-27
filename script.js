const statements = document.querySelectorAll('.statement');
const dropzones = document.querySelectorAll('.dropzone');

// Make sure each statement is draggable by setting the draggable attribute.
statements.forEach(statement => {
    statement.setAttribute('draggable', 'true'); // Ensure it's draggable

    statement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', statement.innerText); // Store the dragged data (text)
        statement.style.opacity = '0.5'; // Make the dragged element slightly transparent
    });

    statement.addEventListener('dragend', () => {
        statement.style.opacity = '1'; // Reset opacity once the dragging ends
    });
});

// Allow drop on the dropzones
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();  // Allow the drop
        dropzone.classList.add('hover'); // Optional: add a hover effect
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('hover'); // Remove hover effect on leave
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const text = e.dataTransfer.getData('text/plain');
        
        const maxItems = parseInt(dropzone.getAttribute('data-max'));
        const currentItems = dropzone.querySelectorAll('.statement').length;

        if (currentItems < maxItems && !Array.from(dropzone.children).some(child => child.innerText === text)) {
            const newStatement = document.createElement('div');
            newStatement.classList.add('statement');
            newStatement.textContent = text;
            newStatement.draggable = true;
            dropzone.appendChild(newStatement); // Add the dropped statement to the dropzone
        }

        dropzone.classList.remove('hover'); // Remove hover effect after drop
    });
});

// Collect the ranking data when submitting
function submitResults() {
    const results = {};

    dropzones.forEach((zone, index) => {
        const rank = index - 3; // Assign rankings from -3 to +3
        results[rank] = [];
        zone.querySelectorAll('.statement').forEach(statement => {
            results[rank].push(statement.innerText);
        });
    });

    const participant = document.getElementById('participant').value;
    if (!participant) {
        alert('Please enter a participant identifier.');
        return; // Prevent form submission if participant ID is empty
    }

    document.getElementById('results').value = JSON.stringify(results);
    document.getElementById('hidden-participant').value = participant;
    document.getElementById('qsortForm').submit();

    alert("Your responses have been submitted!");
}
