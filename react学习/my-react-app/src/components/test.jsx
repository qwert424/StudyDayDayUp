import React from "react";

class test extends React.Component {

    componentWillUnmount() {
        console.log("test.componentWillUnMount")
    }

    render() {
        return (
            <>
                <div>children</div>
            </>
        );
    }
}

export default test;