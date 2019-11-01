import React, { useContext } from "react";
import Context from "../utils/Context";

const Domain = () => {
    const { domain } = useContext(Context);
    return (
        <h1>Index: {domain}</h1>
    );
};

export default Domain;
