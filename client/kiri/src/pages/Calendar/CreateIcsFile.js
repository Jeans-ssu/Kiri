export const CreateIcsFile = (startDate, endDate, title, type, school) => {
  let icsFile = null;
  let test =
    'BEGIN:VCALENDAR\n' +
    'CALSCALE:GREGORIAN\n' +
    'METHOD:PUBLISH\n' +
    'PRODID:-//Test Cal//EN\n' +
    'VERSION:2.0\n' +
    'BEGIN:VEVENT\n' +
    'UID:test-1\n' +
    'DTSTART;VALUE=DATE:' +
    startDate +
    '\n' +
    'DTEND;VALUE=DATE:' +
    endDate +
    '\n' +
    'SUMMARY:' +
    title +
    '\n' +
    'DESCRIPTION:' +
    type +
    ' - ' +
    school +
    '\n' +
    'END:VEVENT\n' +
    'END:VCALENDAR';

  let data = new File([test], { type: 'text/plain' });

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (icsFile !== null) {
    window.URL.revokeObjectURL(icsFile);
  }
  icsFile = window.URL.createObjectURL(data);

  return icsFile;
};
