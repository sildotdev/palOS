import React from 'react';
import { Modal, Tabs, Tab, Fieldset, Button } from '@react95/core';
import { Inetcpl1306 } from '@react95/icons';

interface HackingModalProps {
  onClose: () => void;
}

const HackingModal: React.FC<HackingModalProps> = ({ onClose }) => {
  return (
    <Modal
      icon={<Inetcpl1306 variant="32x32_4"/>}
      title="Palomino Municipal Police Department"
      closeModal={onClose}
      width="700"
      height="500"
    >
        <Tabs defaultActiveTab='Home'>
            <Tab title="Home">
                <p>Palomino welcomes you</p>
            </Tab>
            <Tab title="Certifications">
                <Fieldset legend="Cadet Screening">
                    <p>The cadet screening is the 15-question exam given to all prospective members of the police department</p>
                    <p>Topics include arresting, laws, police conduct, training, and chain of command.</p>
                    <Button disabled>Begin Test</Button>
                </Fieldset>
                <Fieldset legend="SWAT Certification">
                    <p>The SWAT certification is available to police officers.</p>
                    <Button>Begin Test</Button>
                </Fieldset>
            </Tab>
            <Tab title="Management">
            </Tab>
        </Tabs>
    </Modal>
  );
};

export default HackingModal;