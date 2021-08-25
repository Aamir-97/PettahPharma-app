import React from "react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";

const App = () => (<Uploady
    destination={{ url: "http://10.0.2.2:3001/claimexpenses" }}>
    <UploadButton/>
</Uploady>);