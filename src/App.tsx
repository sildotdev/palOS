import { useState, useEffect } from 'react';
import { List, TaskBar, Modal } from '@react95/core';
import { ReaderClosed, WindowsExplorer, FolderFile, Inetcpl1306, Inetcpl1313, Isign324001, Cdplayer107 } from '@react95/icons';
import './App.css';
import Desktop from './components/Desktop';
import FetchModal from './components/FetchModal';
import PoliceApp from './components/PoliceApp';
import HackingModal from './components/Hacking';
import HackingBlocksModal from './components/HackingBlox';
import Webamp from 'webamp';

// Global state for JWT token
let globalJwtToken: string | null = null;

// Global function to set JWT token
export const setGlobalAuthToken = (token: string | null) => {
  globalJwtToken = token;
  // Trigger a re-render of the entire app
  if (window.dispatchEvent) {
    window.dispatchEvent(new Event('storage'));
  }
};

// Make setGlobalAuthToken available globally
(window as any).setGlobalAuthToken = setGlobalAuthToken;

function App() {
  const [first, toggleFirst] = useState(false);
  const [second, toggleSecond] = useState(false);
  const [fetchModal, setFetchModal] = useState(false);
  const [policeModal, setPoliceModal] = useState(false);
  const [hackingModal, setHackingModal] = useState(false);
  const [hackingBlocksModal, setHackingBlocksModal] = useState(false);
  const closeFirst = () => toggleFirst(false);
  const closeSecond = () => toggleSecond(false);
  const closeFetchModal = () => setFetchModal(false);
  const closePoliceModal = () => setPoliceModal(false);
  const closeHackingModal = () => setHackingModal(false);
  const closeHackingBlocksModal = () => setHackingBlocksModal(false);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleStorageEvent = () => forceUpdate({});
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  const desktopIcons = [
    {
      id: 'explorer',
      icon: <WindowsExplorer variant="32x32_4" />,
      text: "Windows Explorer",
      onDoubleClick: () => toggleFirst(true),
    },
    {
      id: 'disk-c',
      icon: <ReaderClosed variant="32x32_4" />,
      text: "Local Disk (C:)",
      onDoubleClick: () => toggleSecond(true),
    },
    {
      id: 'fetch-file',
      icon: <FolderFile variant="32x32_4" />,
      text: "Fetch File",
      onDoubleClick: () => setFetchModal(true),
    },
    {
      id: 'palomino-pd',
      icon: <Inetcpl1306 variant="32x32_4"/>,
      text: "Palomino PD",
      onDoubleClick: () => {
        setPoliceModal(true);
      }
    },
    {
      id: 'palomino-pd-db',
      icon: <Inetcpl1313 variant="32x32_4"/>,
      text: "Police Database",
      onDoubleClick: () => {
        setPoliceModal(true);
      }
    },
    {
      id: 'palomino-hacking-1',
      icon: <Isign324001 variant="32x32_4"/>,
      text: "Hacking - 1",
      onDoubleClick: () => {
        setHackingModal(true);
      }
    },
    {
      id: 'palomino-hacking-2',
      icon: <Isign324001 variant="32x32_4"/>,
      text: "Hacking - 2",
      onDoubleClick: () => {
        setHackingBlocksModal(true);
      }
    },
    {
      id: 'winamp',
      icon: <Cdplayer107 variant="32x32_4"/>,
      text: "Winamp",
      onDoubleClick: () => {
        const webamp = new Webamp({
          initialSkin: {
            url: '/webamp/skins/Windows_95_98.wsz',
          },
          initialTracks: [{
              metaData: {
                  artist: "4311fead41",
                  title: "a6ba3a8c723b27e1a"
              },
              url: `/hack1.wav`,
              duration: 71
          }]
        });
        webamp.onClose(() => {
            webamp.dispose();
        });

        let winampContainer = document.getElementById('winamp-container');
        if (winampContainer) {
          webamp.renderWhenReady(winampContainer);
        } else {
          console.error('Winamp container not found');
        }

        webamp.onWillClose((cancel) => {
          cancel();
        });        
      }
    }
  ];

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      <div id="winamp-container"></div>
      <Desktop icons={desktopIcons} />

      {first && (
        <Modal 
          icon={<WindowsExplorer variant="16x16_4" />} 
          title="Windows Explorer" 
          closeModal={closeFirst} 
          width="300px" 
          height="200px" 
        />
      )}

      {second && (
        <Modal 
          defaultPosition={{x: 50, y: 50}} 
          width="300px" 
          height="200px" 
          icon={<ReaderClosed variant="16x16_4" />} 
          title="Local Disk (C:)" 
          closeModal={closeSecond} 
        />
      )}

      {fetchModal && (
        <FetchModal
          url="https://papi.palominorp.com/client/police/arrests"
          title="Fetched Content"
          onClose={closeFetchModal}
          token={globalJwtToken}
        />

      )}

      {policeModal && (
        <PoliceApp onClose={closePoliceModal} />
      )}

      {hackingModal && (
        <HackingModal onClose={closeHackingModal} />
      )}

      {hackingBlocksModal && (
        <HackingBlocksModal onClose={closeHackingBlocksModal} />
      )}

      <TaskBar
        list={
          <List>
            <List.Item icon={<ReaderClosed variant="32x32_4" />} onClick={() => toggleSecond(true)}>
              Local Disk (C:)
            </List.Item>
            <List.Item icon={<WindowsExplorer variant="32x32_4" />} onClick={() => toggleFirst(true)}>
              Windows Explorer
            </List.Item>
            <List.Item icon={<FolderFile variant="32x32_4" />} onClick={() => setFetchModal(true)}>
              Fetch File
            </List.Item>
            {/* <List.Separator /> */}
            <List.Item icon={<ReaderClosed variant="32x32_4" />} onClick={() => {
              // redirect to localhost:3030/webclient/login
              window.location.href = 'https://auth.palominorp.com/webclient/login?returnUrl=' + encodeURIComponent(window.location.href);
            }}>
              Login
            </List.Item>
          </List>
        } 
      />
    </div>
  );
}

export default App;