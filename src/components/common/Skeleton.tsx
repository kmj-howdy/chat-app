import { CSSProperties } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const SkeletonBox = styled.div<{
  $height: CSSProperties['height'];
  $width: CSSProperties['width'];
}>`
  width: 100%;
  height: ${({ $height }) => $height || '2rem'};
  width: ${({ $width }) => $width || 'auto'};
  background: #e0e0e0;
  background-image: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 0.2rem;
`;

type SkeletonProps = {
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
};

const Skeleton = ({ height, width }: SkeletonProps) => {
  return <SkeletonBox $height={height} $width={width} />;
};

export default Skeleton;
