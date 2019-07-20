import useJsonp from "./useJsonp";

export default function useLatestMeetup() {
  const id = window.location.search.slice(1);
  const events = useJsonp(
    !id && "https://api.meetup.com/hamburg-js/events?callback=callback"
  );
  return id
    ? { id, link: `https://www.meetup.com/de-DE/hamburg-js/events/${id}/` }
    : events && events.data[0];
}
