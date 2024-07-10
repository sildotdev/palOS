import { useState } from 'react';
import { List, TaskBar, Modal } from '@react95/core';
import { ReaderClosed, WindowsExplorer, FolderFile, Inetcpl1306, Inetcpl1313 } from '@react95/icons';
import './App.css';
import Desktop from './components/Desktop';
import FetchModal from './components/FetchModal';
import PoliceApp from './components/PoliceApp';

function App() {
  const [first, toggleFirst] = useState(false);
  const [second, toggleSecond] = useState(false);
  const [fetchModal, setFetchModal] = useState(false);
  const [policeModal, setPoliceModal] = useState(false);
  const closeFirst = () => toggleFirst(false);
  const closeSecond = () => toggleSecond(false);
  const closeFetchModal = () => setFetchModal(false);
  const closePoliceModal = () => setPoliceModal(false);

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
    }
  ];

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
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
          url="http://localhost:3030/client/police/arrests"  // Replace with your actual API endpoint
          title="Fetched Content"
          onClose={closeFetchModal}
        />
      )}

      {policeModal && (
        <PoliceApp onClose={closePoliceModal} />
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
              window.location.href = 'http://localhost:3000/webclient/login?returnUrl=' + encodeURIComponent(window.location.href);
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