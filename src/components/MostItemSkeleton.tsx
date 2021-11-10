import ContentLoader from 'react-content-loader';
import React from 'react';

const MostItemSkeleton: React.FC = () => (
  <ContentLoader
    speed={3}
    width="100%"
    height={178}
    viewBox="0 0 316 178"
    backgroundColor="#EEEEEE"
    foregroundColor="#E1E1E1"
  >
    <rect x="0" y="10" rx="4" ry="4" width="100%" height="32" />
    <rect x="0" y="52" rx="4" ry="4" width="100%" height="32" />
    <rect x="0" y="94" rx="4" ry="4" width="100%" height="32" />
    <rect x="0" y="136" rx="4" ry="4" width="100%" height="32" />
  </ContentLoader>
);

export default MostItemSkeleton;
