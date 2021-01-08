import * as React from 'react';

type ErrorProps = {
    message: string
};

class Error extends React.PureComponent<ErrorProps> {

    public render() {
        return (
            <React.Fragment>
                <div className="alert alert-danger" role="alert">
                    {this.props.message}
                </div>
            </React.Fragment>
        );
    }
}

export default Error;