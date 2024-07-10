import React from 'react';

interface DesktopIconProps {
  icon: React.ReactNode;
  text: string;
  onDoubleClick: () => void;
}

const ICON_SIZE = 64; // Size of the icon (width and height)

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, text, onDoubleClick }) => {
  return (
    <div
      className="desktop-icon"
      onDoubleClick={onDoubleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${ICON_SIZE}px`,
        height: `${ICON_SIZE}px`,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
    {icon}
      <span style={{ 
        textAlign: 'center', 
        marginTop: '5px',
        fontSize: '12px',
        color: 'white',
        textShadow: '1px 1px 1px black',
        wordWrap: 'break-word',
        maxWidth: '100%',
      }}>
        {text}
      </span>
    </div>
  );
};

export default DesktopIcon;