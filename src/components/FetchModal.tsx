import React, { useState, useEffect } from 'react';
import { Modal, Frame, Button } from '@react95/core';
import { FolderFile } from '@react95/icons';

interface FetchModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

const FetchModal: React.FC<FetchModalProps> = ({ url, title, onClose }) => {
  const [content, setContent] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (e) {
        // setError(`Failed to fetch data: ${e.message}`);
      }
    };

    fetchData();
  }, [url]);

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
      <Button onClick={onClose} style={{ marginTop: '10px' }}>
        Close
      </Button>
    </Modal>
  );
};

export default FetchModal;