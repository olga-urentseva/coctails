import styled from "styled-components";
import { Container } from "../../atoms/Container";
import Wave from "./Wave";

const FooterComponent = styled.footer`
  background-color: ${(props) => props.theme.primary};
  position: relative;
`;

const FooterTitle = styled.h3`
  color: ${(props) => props.theme.textInversion};
  position: absolute;
  bottom: 1em;
  margin: 0 1em;
  font-weight: 400;
  font-size: 1em;
`;

const WavyFooter = styled(Wave)``;

const FooterContainer = styled(Container)`
  margin: 0 auto;
  padding: 0;
`;

function Footer() {
  return (
    <FooterComponent>
      <WavyFooter />
      <FooterTitle>Bart-t-tender</FooterTitle>
    </FooterComponent>
  );
}

export default Footer;
