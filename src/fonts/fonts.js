import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @font-face {
    font-family: 'BebasNeue';
    src: url('https://platform.culturehq.com/fonts/bebas_neue/BebasNeue-Regular.eot');
    src: url('https://platform.culturehq.com/fonts/bebas_neue/BebasNeue-Regular.woff') format('woff'),
    url('https://platform.culturehq.com/fonts/bebas_neue/BebasNeue-Regular.oft') format('opentype');
  }
  @font-face {
    font-family: 'SourceSansPro';
    src: url('https://platform.culturehq.com/fonts/source-sans-pro/SourceSansPro-Regular.ttf') format('truetype');
  }
`;
