import * as React from "react";
import TemplateWrapper from "../Template";
import { QrReader, OnResultFunction } from "react-qr-reader";
import "./Scan.scss";

export default function Scan() {
  const qrcodeRef = React.useRef(null);
  const isValidUrl = (urlString: string): boolean => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  React.useEffect(() => {
    return () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
      }).catch(error => console.log(error));
    }
  },[])

  return (
    <TemplateWrapper defaultIndex="2">
      <div className="scanner-container">
        <QrReader
          onResult={(result, error) => {
            if (result) {
              if (result.getText() && isValidUrl(result.getText())) {
                  window.location.href = result.getText();
              }
            }

            if (error) {
              console.error('ERROR:::', error);
            }
          }}
          constraints={{
            width: 100,
            height: 100,
          }}
          videoStyle={{
            width: "100%",
            height: "800px",
            borderRadius: "40px",
          }}
          className="video"
          containerStyle={{
            width: "100%",
            borderRadius: "10px",
          }}
        />
      </div>
    </TemplateWrapper>
  );
}
