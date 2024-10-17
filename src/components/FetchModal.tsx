import React, { useState, useEffect } from 'react';
import { Modal, Frame, Button } from '@react95/core';
import { FolderFile } from '@react95/icons';

interface FetchModalProps {
  url: string;
  title: string;
  onClose: () => void;
  token: string | null;
}

const FetchModal: React.FC<FetchModalProps> = ({ url, title, onClose, token }) => {
  const [content, setContent] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers: HeadersInit = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          credentials: token ? 'omit' : 'include',
          headers
        });

        console.log('credentials were', token ? 'omit' : 'include');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (e) {
        setError(`Failed to fetch data idk why  tho`);
      }
    };

    fetchData();
  }, [url, forceUpdate]);

  // Function to trigger re-fetch when global token changes
  const refreshData = () => {
    forceUpdate({});
  };

  return (
    <Modal
      icon={<FolderFile variant="32x32_4" />}
      title={title}
      closeModal={onClose}
      width="400"
      height="300"
    >
      <Frame
        bg="white"
        boxShadow="in"
        height="100%"
        padding={8}
        style={{ overflowY: 'auto' }}
      >
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {content}
          </pre>
        )}
      </Frame>
      <Button onClick={refreshData} style={{ marginTop: '10px' }}>
        Refresh
      </Button>
      <Button onClick={onClose} style={{ marginTop: '10px' }}>
        Close
      </Button>
    </Modal>
  );
};

export default FetchModal;