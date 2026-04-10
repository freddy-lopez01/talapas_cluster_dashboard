import React from "react";
import './InfoCube.css';
const InfoCube = ({ title, value, error }) => {
    return (
        <div className="info-cube">
            {error ? (
                <p className="error">{error}</p>
            ) : (
                <>
                    <p className="cube-title">{title}</p>
                    <p className="cube-value">{value !== null ? value : "Loading..."}</p>
                </>
            )}
        </div>
    );
};

export default InfoCube;

