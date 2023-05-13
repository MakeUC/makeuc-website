import { Suspense, cache } from "react";

import { prisma } from "~/lib/prisma";


const getOrganizers = cache(async () => await prisma.organizer.findMany());

async function OrganizerCarouselAsync() {
  // TODO: Fill out this file appropriately
  const organizers = await getOrganizers();

  return (
    <>
      <span>{JSON.stringify(organizers, undefined, 2)}</span>
    </>
  );
}

export function OrganizerCarousel() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* @ts-expect-error Async Server Component */}
      <OrganizerCarouselAsync />
    </Suspense>);
}