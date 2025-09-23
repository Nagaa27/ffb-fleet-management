import React from 'react';

export const Buggy = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error('Boom!');
  return <div>All good</div>;
};
