import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import ErrorBoundary from "./ErrorBoundary";
import jsQR from "jsqr";
import { locateHotel } from "./Firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const QRCodeScannerComponent = () => {
  const [result, setResult] = useState("");
  const [scanMode, setScanMode] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  // const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [hotelName, setHotelName] = useState("");
  const [qrCodeImage, setQRCodeImage] = useState("");

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      setScanMode(false); // Stop scanning once a QR code is detected
      console.log("QR code data:", data);
    }
  };

  const handleNavigateToHome = (hotelUniqueId, storeLocationId) => {
    navigate(
      `/home?hotelId=${hotelUniqueId}&storeLocationId=${storeLocationId}`
    );
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleScanModeChange = () => {
    setScanMode(!scanMode);
    setResult(""); // Clear the result when switching modes
    setErrorMessage(""); // Clear the error when switching modes
  };

  const handleScanning = async (data) => {
    if (data) {
      setResult(data);
      setShowScanner(false);
  
      const hotelUniqueId = data.split("=")[1].split("+")[0];
      const storeUniqueId = data
        .split("=")[1]
        .split("+")[1]
        .split("?")[0];
  
      console.log(hotelUniqueId);
      console.log(storeUniqueId);
  
      const hotel = await locateHotel(hotelUniqueId, storeUniqueId);
      if (hotel) {
        const qrCodeData = data; // The scanned QR code data
        const qrCodeText = "Scanned QR Code:\n" + qrCodeData;
      
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = "16px Arial"; // Set the font size and family
        const textMetrics = context.measureText(qrCodeText);
      
        // Adjust canvas width and height based on the text size
        canvas.width = textMetrics.width + 20; // Add some padding
        canvas.height = 40; // Adjust as needed
      
        context.fillStyle = "#FFFFFF"; // Set text color
        context.fillRect(0, 0, canvas.width, canvas.height);
      
        context.fillStyle = "#000000"; // Set text color
        context.fillText(qrCodeText, 10, 20); // Position the text
      
        const qrCodeImageBase64 = canvas.toDataURL();
      
        const existingHotel = localStorage.getItem("hotelUniqueId");
        if (existingHotel) {
          localStorage.removeItem("hotelUniqueId");
          localStorage.removeItem("storeUniqueId");
          localStorage.removeItem("qrCodeImage");
        }
      
        localStorage.setItem("hotelUniqueId", hotelUniqueId);
        localStorage.setItem("storeUniqueId", storeUniqueId);
        setHotelName(hotel.hotel.name);
      
        localStorage.setItem("qrCodeImage", qrCodeImageBase64);
        setQRCodeImage(qrCodeImageBase64);
      
        handleNavigateToHome(hotelUniqueId, storeUniqueId);
      } else {
        toast.error("Restaurant not Found");
      }
    }
  };
  

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = async () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, image.width, image.height);
          const imageData = context.getImageData(
            0,
            0,
            image.width,
            image.height
          );

          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setResult(code.data);
            setScanMode(false);
            setErrorMessage("");
            console.log("QR code data:", code.data); // Log the QR code data
            const hotelUniqueId = code.data.split("=")[1].split("+")[0];
            const storeUniqueId = code.data
              .split("=")[1]
              .split("+")[1]
              .split("?")[0];
            // https://tap4menu.app?h=124+1040?tn=1
            console.log(hotelUniqueId);
            console.log(storeUniqueId);
            const hotel = await locateHotel(hotelUniqueId, storeUniqueId);
            if (hotel) {
              const canva = document.createElement("canvas");
              canva.width = imageData.width;
              canva.height = imageData.height;
              const context = canva.getContext("2d");
              context.putImageData(imageData, 0, 0);
              const qrCodeImageBase64 = canva.toDataURL();
              const existingHotel = localStorage.getItem("hotelUniqueId");
              if (existingHotel) {
                localStorage.removeItem("hotelUniqueId");
                localStorage.removeItem("qrCodeImage");
              }
              localStorage.setItem("hotelUniqueId", hotelUniqueId);
              localStorage.setItem("storeUniqueId", storeUniqueId);
              setHotelName(hotel.hotel.name);
              // Store the QR code image in localStorage
              localStorage.setItem("qrCodeImage", qrCodeImageBase64);
              setQRCodeImage(qrCodeImageBase64);

              //navigate('/home')
              handleNavigateToHome(hotelUniqueId, storeUniqueId);
            } else {
              toast.error("Restaurant not Found");
            }
          } else {
            setResult("");
            setScanMode(false);
            toast.error("The uploaded file is not a QR code image");
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
    const padding = length % 4 === 0 ? 0 : 4 - (length % 4);
    const paddedData = new Uint8ClampedArray(length + padding);
    paddedData.set(data);
    return paddedData;
  };

  return (
    <div className="container px-5 py-10 mx-auto text-center lg:px-10">
      {errorMessage && <p>{errorMessage}</p>}
      {!scanMode && (
        <div>
          <button className="py-5" onClick={handleScanModeChange}>
            Upload QR Code Pic to Scan
          </button>
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
            style={{ width: "100%" }}
          />
          <br />
          <button  className onClick={handleScanModeChange}>Cancel</button>
        </div>
      )}
      {/* <p>{result}</p> */}
      {showScanner ? (
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScanning}
            style={{ width: "100%" }}
          />
          <button onClick={() => setShowScanner(false)}>Cancel</button>
          <p>{result}</p>
        </div>
      ) : (
        <button className="bg-blue-500 rounded-full px-4 py-2 text-white font-semibold hover:bg-blue-600"
        onClick={() => setShowScanner(true)}>Scan QR Code</button>
      )}

      {localStorage.getItem("hotelUniqueId") &&  localStorage.getItem("qrCodeImage") (
          <div>
            <p>{hotelName}</p>
            <img
              src={localStorage.getItem("qrCodeImage")}
              alt="QR Code"
              onClick={() =>
                navigate(`/home?hotelId=${localStorage.getItem("hotelUniqueId")}&storeLocationId=${localStorage.getItem("storeUniqueId")}`)
              }
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
