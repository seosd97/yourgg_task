import ContentLoader from 'react-content-loader';
import React from 'react';

const MainStatSkeleton: React.FC = () => (
  <ContentLoader
    speed={3}
    width="100%"
    height={77}
    viewBox="0 0 316 77"
    backgroundColor="#EEEEEE"
    foregroundColor="#E1E1E1"
  >
    <rect x="0" y="0" rx="4" ry="4" width="100" height="19" />
    <rect x="0" y="25" rx="4" ry="4" width="100" height="19" />
    <rect x="0" y="50" rx="4" ry="4" width="100" height="19" />
    <rect x="136" y="0" rx="4" ry="4" width="174" height="77" />
  </ContentLoader>
);

export default MainStatSkeleton;
