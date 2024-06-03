import React, { useRef } from 'react';
import { Button, QRCode } from 'antd';

function Test(){
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    const qrElement = qrRef.current.querySelector('canvas');
    if (qrElement) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const qrSize = qrElement.width;
      const borderSize = 50;
      const size = qrSize + 2 * borderSize;

      canvas.width = size;
      canvas.height = size;

      // Fill background with white color
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, size, size);

      // Draw QR code onto the canvas with the border
      ctx.drawImage(qrElement, borderSize, borderSize);

      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div id="myqrcode" ref={qrRef}>
      <QRCode
        value="https://ant.design/"
        bgColor="#fff"
        style={{
          marginBottom: 16,
        }}
      />
      <Button type="primary" onClick={downloadQRCode}>
        Download
      </Button>
    </div>
  );
};

export default Test;
