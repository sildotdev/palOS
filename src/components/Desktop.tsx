import React, { useState, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';

interface IconData {
  id: string;
  icon: React.ReactNode;
  text: string;
  onDoubleClick: () => void;
}

interface DesktopProps {
  icons: IconData[];
}

const TASKBAR_HEIGHT = 28; // Height of the taskbar in pixels
const ICON_SIZE = 64; // Size of the icon (width and height)
const ICON_MARGIN = 16; // Margin around each icon

const Desktop: React.FC<DesktopProps> = ({ icons }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - TASKBAR_HEIGHT,
      });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const iconsPerColumn = Math.floor(dimensions.height / (ICON_SIZE + ICON_MARGIN));
  const columnsCount = Math.ceil(icons.length / iconsPerColumn);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: `${TASKBAR_HEIGHT}px`,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: `repeat(${iconsPerColumn}, ${ICON_SIZE + ICON_MARGIN}px)`,
        gridTemplateColumns: `repeat(${columnsCount}, ${ICON_SIZE + ICON_MARGIN}px)`,
        gridAutoFlow: 'column',
        justifyContent: 'start',
        alignContent: 'start',
        padding: `${ICON_MARGIN / 2}px`,
      }}
    >
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon.icon}
          text={icon.text}
          onDoubleClick={icon.onDoubleClick}
        />
      ))}
    </div>
  );
};

export default Desktop;