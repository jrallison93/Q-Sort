function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById("YOUR-SPREADSHEET-ID").getActiveSheet();
    const data = JSON.parse(e.parameter.results);
    const participant = e.parameter.participant || "Anonymous";

    sheet.appendRow([new Date(), participant, JSON.stringify(data)]);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
