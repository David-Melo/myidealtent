import React, { useContext } from "react";
import Context from "../utils/Context";

const IsServer = () => {
    const { isServer } = useContext(Context);
    return (
        <h2>Server: {isServer?'true':'false'}</h2>
    );
};

export default IsServer;
