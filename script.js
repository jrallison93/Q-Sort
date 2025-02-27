function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(qVpxXHVRne58loOYUZBh3smgubT5kDSvltUid99TNKk).getActiveSheet();
    const data = JSON.parse(e.parameter.results);
    const participant = e.parameter.participant || "Anonymous";

    sheet.appendRow([new Date(), participant, JSON.stringify(data)]);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

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
    document.getElementById('results').value = JSON.stringify(results);
    document.getElementById('participant').value = participant;
    document.getElementById('qsortForm').submit();

    alert("Your responses have been submitted!");
}
