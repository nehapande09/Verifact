import React, { useState } from 'react';

const StatementInput = ({ onVerify }) => {
    

    const handleSubmit = (formData) => {
        e.preventDefault();
        const statement = formData.get('statement').valueOf()?.toString();
        console.info("statement:", statement);
        onVerify(statement);
    };

    return (
        <form action={handleSubmit} className="statement-input">
            <input 
                type="text" 
                name = "statement"
                placeholder="Enter statement to verify..." 
                required 
            />
            <button type="submit">Verify</button>
        </form>
    );
};

export default StatementInput;