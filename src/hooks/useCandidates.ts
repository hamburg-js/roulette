import useJsonp from "./useJsonp";
import { useEffect, useState } from "react";
import _shuffle from "lodash/shuffle";
import useLocalStorage from "./useLocalStorage";

export default function useCandidates(eventId?: string) {
  const [candidates, setCandidates] = useState();
  const [excludeIds, setExcludeIds] = useLocalStorage("exclude", []);
  const event = useJsonp(
    !!eventId &&
      `https://api.meetup.com/hamburg-js/events/${eventId}/comments?callback=callback`
  );
  useEffect(() => {
    if (event) setCandidates(getCandidates(event, excludeIds));
  }, [event, excludeIds]);

  const remove = (candidate?: Candidate) => {
    if (candidates && candidate) {
      const i = candidates.indexOf(candidate);
      setCandidates(candidates.slice(0, i).concat(candidates.slice(i + 1)));
      setExcludeIds(excludeIds.concat(candidate.id));
    }
  };

  return [candidates, remove] as [Candidate[], (c?: Candidate) => void];
}

function getUrl(s: string) {
  const m = /https?:\S+/.exec(s);
  return m && m[0];
}

function isReadmeUrl(s: string) {
  return /^https?:\/\/(www\.)?(npmjs|github|gitlab)\.com\/.+/i.test(s);
}

function getColor(i: number, n: number) {
  return `hsl(${50 + (360 / n) * i}, ${90 + Math.random() * 10}%, ${55 +
    Math.random() * 10}%)`;
}

function getCandidates(data: any, excludeIds: string[]): Candidate[] {
  if (!data) return [];
  const comments = data.data.concat(
    ...data.data.map((c: any) => c.replies).filter(Boolean)
  );

  return _shuffle(
    comments
      .map((c: any) => ({
        id: c.id,
        name: c.member && c.member.name,
        photo: c.member && c.member.photo && c.member.photo.photo_link,
        url: getUrl(c.comment)
      }))
      .filter((c: any) => isReadmeUrl(c.url) && !excludeIds.includes(c.id))
      .map((c: any, i: number, a: any[]) => ({
        ...c,
        color: getColor(i, a.length)
      }))
  );
}
