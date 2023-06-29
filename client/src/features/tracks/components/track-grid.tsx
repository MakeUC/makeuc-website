import { TRACKS } from "../constants/track-data";

import { TrackCard } from "./track-card";


export function TrackGrid() {
  return (
    <div className="grid grid-cols-[repeat(1,_1fr)] md:grid-cols-[repeat(2,_1fr)] 2xl:grid-cols-[repeat(4,_1fr)] gap-8">
      {TRACKS.map(cardProps => <TrackCard key={cardProps.name} {...cardProps} />)}
    </div>
  );
}