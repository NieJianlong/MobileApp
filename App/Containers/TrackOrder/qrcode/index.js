import React from "react";
import QRCode from "react-native-qrcode-svg";

function Qrcode(props) {

    return ( 
        <QRCode
            value = {props.value || ""}
        />
    );
}

export default Qrcode;