import React from "react";

const FormInput = ({id, ...otherProps}) => {
    return (
        <div className="mb-4">
            <input id={id} {...otherProps} />
        </div>
    );
};

export default FormInput;
