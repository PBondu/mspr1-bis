"use client"

import { useContext } from 'react';
import { SortedInfo } from './sortConcertData';
import ShowInfo from './showInfo';

export default function LineUp() {

  const concertInfo = useContext(SortedInfo);

  if (!concertInfo) {
    return <div>Loading...</div>;
  };
  return (

    <ul className="flex flex-col h-80 overflow-y-scroll bg-slate-200">

      {concertInfo.map((post, index) => (
        <ShowInfo
          key={index}
          group={post.acf.groupe}
          spot={post.acf.spot}
          time={post.acf.horaires}
        />

      ))}
    </ul>
  );
};