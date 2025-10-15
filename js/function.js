const meetingWillBe = (startDay, endDay, startMeeting, timeMeeting) => {
  const separatorStartDay = startDay.indexOf(':');
  const startDayMinutes = parseInt(startDay.slice(0, separatorStartDay), 10) * 60 + parseInt(startDay.slice(separatorStartDay + 1), 10);
  const separatorEndDay = endDay.indexOf(':');
  const endDayMinutes = parseInt(endDay.slice(0, separatorEndDay), 10) * 60 + parseInt(endDay.slice(separatorEndDay + 1), 10);
  const separatorStartMeeting = startMeeting.indexOf(':');
  const startMeetingMinutes = parseInt(startMeeting.slice(0, separatorStartMeeting), 10) * 60 + parseInt(startMeeting.slice(separatorStartMeeting + 1), 10);
  return startMeetingMinutes >= startDayMinutes && startMeetingMinutes <= endDayMinutes && startMeetingMinutes + timeMeeting <= endDayMinutes;
};

meetingWillBe('08:00', '17:30', '14:00', 90);
