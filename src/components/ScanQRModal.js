import React, { useState } from 'react';
import QRCodeScanner from './QRCodeScanner';

const ScanQRModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleScanButtonClick = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div>
      <button onClick={handleScanButtonClick}>Scan QR</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <QRCodeScanner />
          </div>
        </div>
      )}
    </div>
  );
}

export default ScanQRModal;
