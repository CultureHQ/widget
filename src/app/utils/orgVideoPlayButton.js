import React from "react";
import styled from "styled-components";

const DefaultIcon = styled.svg`
  display: block;
  height: 40px !important;
  width: 40px !important;
`;

const TargetPlayContainer = styled.div`
  align-items: center;
  background-color: #CC0000;
  border-radius: 40px;
  color: #FFFFFF;
  display: flex;
  font-family: HelveticaForTarget;
  height: 44px;
  justify-content: center;
  margin-top: 15px;
  width: 117px;
`;

const RtxIcon = styled.svg`
  display: block;
  height: 16px !important;
  margin-left: 10px;
  width: 16px !important;
`;

const RtxPlayContainer = styled.div`
  align-items: center;
  background-color: #CE1126;
  border-radius: 40px;
  color: #FFFFFF;
  display: flex;
  font-family: Objektiv Mk2;
  height: 44px;
  justify-content: center;
  margin-top: 15px;
  width: 117px;
`;

const TargetIcon = styled.svg`
  display: block;
  height: 16px !important;
  margin-left: 10px;
  width: 16px !important;
`;

const orgVideoPlayButton = (orgName) => {
    switch(orgName) {
      case "Target":
        return (
          <TargetPlayContainer>
            <span style={{ fontWeight: "600", fontSize: "16px" }}>Play</span>
            <TargetIcon aria-hidden="true" role="presentation" viewBox="0 0 30.065 30.065">
              <g>
                <path style={{ fill: "#FFFFFF" }} d="M26.511,12.004L6.233,0.463c-2.151-1.228-4.344,0.115-4.344,2.53v24.093 c0,2.046,1.332,2.979,2.57,2.979c0.583,0,1.177-0.184,1.767-0.543l20.369-12.468c1.024-0.629,1.599-1.56,1.581-2.555 C28.159,13.503,27.553,12.593,26.511,12.004z M25.23,14.827L4.862,27.292c-0.137,0.084-0.245,0.126-0.319,0.147 c-0.02-0.074-0.04-0.188-0.04-0.353V2.994c0-0.248,0.045-0.373,0.045-0.404c0.08,0.005,0.22,0.046,0.396,0.146l20.275,11.541 c0.25,0.143,0.324,0.267,0.348,0.24C25.554,14.551,25.469,14.678,25.23,14.827z" />
              </g>
            </TargetIcon>
          </TargetPlayContainer>
        );
      case "RTX":
        return (
          <RtxPlayContainer>
            <span style={{ fontWeight: "600", fontSize: "16px" }}>Play</span>
            <RtxIcon aria-hidden="true" role="presentation" viewBox="0 0 30.065 30.065">
              <g>
                <path
                  fill="#FFFFFF"
                  d="
                    M6 4
                    Q6 2 8 3
                    L24 13
                    Q26 14 24 15
                    L8 25
                    Q6 26 6 24
                    Z
                  "
                />
              </g>
            </RtxIcon>
          </RtxPlayContainer>
        );
      default:
        return (
          <DefaultIcon aria-hidden="true" role="presentation" viewBox="0 0 264 264">
            <path transform="translate(0 0)" style={{ fill: "#FFFFFF" }} d="M238.163,115.57l-68.127-39.741c-15.201-8.899-40.064-23.393-55.296-32.256L44.115,3.831 C28.919-5.067,13.974,2.07,13.974,19.698v224c0,17.567,14.945,24.735,30.147,15.872l69.376-39.741 c15.232-8.863,40.735-23.357,55.936-32.256l68.449-39.741C253.047,138.933,253.334,124.433,238.163,115.57z" />
          </DefaultIcon>
        );
    }
};

export default orgVideoPlayButton;
