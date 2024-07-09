import { useState } from 'react';
import { List, TaskBar, Modal } from '@react95/core';
import { ReaderClosed, WindowsExplorer } from '@react95/icons';
import './App.css';

// import '@react95/core/GlobalStyle';
// import '@react95/core/themes/win95.css';

function App() {
  const [first, toggleFirst] = useState(false);
  const [second, toggleSecond] = useState(false);
  const closeFirst = () => toggleFirst(false);
  const closeSecond = () => toggleSecond(false);
  return <>
      {first && <Modal icon={<WindowsExplorer variant="16x16_4" />} title="Windows Explorer" closeModal={closeFirst} width="300px" height="200px" />}

      {second && <Modal defaultPosition={{
      x: 50,
      y: 50
    }} width="300px" height="200px" icon={<ReaderClosed variant="16x16_4" />} title="Local Disk (C:)" closeModal={closeSecond} />}

      <TaskBar list={<List>
            <List.Item icon={<ReaderClosed variant="32x32_4" />} onClick={() => toggleSecond(true)}>
              Local Disk (C:)
            </List.Item>
            <List.Item icon={<WindowsExplorer variant="32x32_4" />} onClick={() => {
        toggleFirst(true);
      }}>
              Windows Explorer
            </List.Item>
          </List>} />
    </>;
}

export default App;
