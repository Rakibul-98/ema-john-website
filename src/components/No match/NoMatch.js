import React from 'react';

const NoMatch = () => {

    const noMatchstyle={
        marginTop:'50px',
        textAlign:'center'
    }
    
    return (
        <div style= {noMatchstyle} >
            <h4>Your requested page not found...</h4>
            <h1 className="text-danger font-weight-bolder" >404 : Error !!!!</h1>
        </div>
    );
};

export default NoMatch;