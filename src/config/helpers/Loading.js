import React from "react";
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div className="sweet-loading">
        <ScaleLoader
          css={override}
        //   size={150}
          color={"var(--color-primary)"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export default Loading