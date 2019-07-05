import useJsonp from "./useJsonp";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";

export default function useCandidates(eventId?: string) {
  const example = useFetch(
    !eventId && `${process.env.PUBLIC_URL}/example.json`
  );
  const event = useJsonp(
    !!eventId &&
      `https://api.meetup.com/hamburg-js/events/${eventId}/comments?callback=callback`
  );
  const data = event || example;
  const [candidates, setCandidates] = useState();
  useEffect(() => {
    if (data) setCandidates(getCandidates(data));
  }, [data]);

  const remove = (candidate: Candidate) => {
    if (candidates) {
      const i = candidates.indexOf(candidate);
      setCandidates(candidates.slice(0, i).concat(candidates.slice(i + 1)));
    }
  };

  return [candidates, remove] as [Candidate[], (c: Candidate) => void];
}

function getUrl(s: string) {
  const m = /https?:\S+/.exec(s);
  return m && m[0];
}

function getColor(i: number, n: number) {
  return `hsl(${50 + (360 / n) * i}, ${90 + Math.random() * 10}%, ${55 +
    Math.random() * 10}%)`;
}

function getCandidates(data: any): Candidate[] {
  const comments = data.data.concat(
    ...data.data.map((c: any) => c.replies).filter(Boolean)
  );
  return comments
    .map((c: any) => ({
      name: c.member && c.member.name,
      photo: c.member && c.member.photo && c.member.photo.photo_link,
      url: getUrl(c.comment)
    }))
    .filter((c: any) => c.url)
    .map((c: any, i: number, a: any[]) => ({
      ...c,
      color: getColor(i, a.length)
    }));
}
