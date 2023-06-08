import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import ErrorBoundary from './ErrorBoundary';
import jsQR from 'jsqr';
import { locateHotel } from './Firebase/firestore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
// import '../index.css';

const QRCodeScannerComponent = () => {
  const [result, setResult] = useState('');
  const [scanMode, setScanMode] = useState(false);
  // const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [hotelName, setHotelName] = useState('');
  const [qrCodeImage, setQRCodeImage] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      setScanMode(false); // Stop scanning once a QR code is detected
      console.log('QR code data:', data); 
      
    }
  };

  const handleNavigateToHome = (hotelUniqueId, storeLocationId) => {
    navigate(`/home?hotelId=${hotelUniqueId}&storeLocationId=${storeLocationId}`);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleScanModeChange = () => {
    setScanMode(!scanMode);
    setResult('');// Clear the result when switching modes
    setErrorMessage(''); // Clear the error when switching modes
  };
//  the handleFileUpload function reads the uploaded file as an ArrayBuffer 
// and creates an ImageData object from it. It then passes this data to jsQR to attempt to decode it.
// If jsQR is successful in decoding the image, 
//it sets the result state to the decoded data. 
//If it is not successful, it sets the result state to a message indicating that the uploaded file is not a QR code image.
  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // const imageData = new ImageData(new Uint8ClampedArray(reader.result), 1, 1);
  //       // if (imageData.data.length % 4 !== 0 || imageData.data.length !== imageData.width * imageData.height * 4) {
  //       //   setResult('The uploaded file is not a valid QR code image');
  //       //   setScanMode(false);
  //       //   return;
  //       // }
  //       const data = new Uint8ClampedArray(reader.result);
  //       const paddedData = addPadding(data);
  //       const imageData = new ImageData(paddedData, 1, 1);
  //       const code = jsQR(imageData.data, imageData.width, imageData.height);
  //       // const code = jsQR(imageData.data, imageData.width, imageData.height);
  //       if (code) {
  //         setResult(code.data);
  //         setScanMode(false);
  //         setErrorMessage('');
  //       } else {
  //         // setResult('The uploaded file is not a QR code image');
  //         // setError('The uploaded file is not a QR code image');
  //         setResult('');
  //         setScanMode(false);
  //         setErrorMessage('The uploaded file is not a QR code image');
  //       }
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = async() => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, image.width, image.height);
          const imageData = context.getImageData(0, 0, image.width, image.height);
  
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setResult(code.data);
            setScanMode(false);
            setErrorMessage('');
            console.log('QR code data:', code.data); // Log the QR code data
            const hotelUniqueId = code.data.split('=')[1].split('+')[0];
            const storeUniqueId = code.data.split('=')[1].split('+')[1].split('?')[0];
            // https://tap4menu.app?h=124+1040?tn=1
            console.log(hotelUniqueId);
            console.log(storeUniqueId);
            const hotel = await locateHotel(hotelUniqueId, storeUniqueId);
            if(hotel){
              const canva = document.createElement('canvas');
              canva.width = imageData.width;
              canva.height = imageData.height;
              const context = canva.getContext('2d');
              context.putImageData(imageData, 0, 0);
              const qrCodeImageBase64 = canva.toDataURL();
              const existingHotel = localStorage.getItem('hotelUniqueId');
              if(existingHotel){
                localStorage.removeItem('hotelUniqueId');
                localStorage.removeItem('qrCodeImage');
              }
              localStorage.setItem('hotelUniqueId', hotelUniqueId);
              setHotelName(hotel.hotel.name);
               // Store the QR code image in localStorage
              localStorage.setItem('qrCodeImage', qrCodeImageBase64);
              setQRCodeImage(qrCodeImageBase64);
            
              //navigate('/home')
              handleNavigateToHome(hotelUniqueId,storeUniqueId);

            }else{
              toast.error('Restaurant not Found')
            }
          } else {
            setResult('');
            setScanMode(false);
            toast.error('The uploaded file is not a QR code image')
            // setErrorMessage('The uploaded file is not a QR code image');
          }
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  
  const addPadding = (data) => {
    const length = data.length;
    const padding = length % 4 === 0 ? 0 : 4 - length % 4;
    const paddedData = new Uint8ClampedArray(length + padding);
    paddedData.set(data);
    return paddedData;
  };

  return (
    <div className="container px-5 py-10 mx-auto text-center lg:px-10">
      {errorMessage && <p>{errorMessage}</p>}
      {!scanMode && (
        <div>
          <button className="py-5" onClick={handleScanModeChange}>Scan QR Code</button>
          <br />
          <input
            type="file"
            className="text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700"
            accept="image/*"
            onChange={handleFileUpload}
          />
          
        </div>
      )}
      {scanMode && (
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          <br />
          <button onClick={handleScanModeChange}>Cancel</button>
        </div>
      )}
      {/* <p>{result}</p> */}
      {localStorage.getItem('hotelUniqueId') && localStorage.getItem('qrCodeImageBase64') && (
        <div>
          <p>{hotelName}</p>
          <img
            src={localStorage.getItem('qrCodeImageBase64')}
            alt="QR Code"
            onClick={() => navigate(`/home/${localStorage.getItem('hotelUniqueId')}`)}
          />
        </div>
      )}
    </div>
  );
};

const QRCodeScannerWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <QRCodeScannerComponent />
    </ErrorBoundary>
  );
};

export default QRCodeScannerWithErrorBoundary;

