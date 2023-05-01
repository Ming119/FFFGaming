import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { Envelope, Discord } from "react-bootstrap-icons";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <Row className="my-3">
        <Col className="text-center fs-1 fw-bold">Contact Us</Col>
      </Row>
      
      <hr />

      <Row className="my-3 gx-5">
        <Col sm={ 12 } md={ 6 } className="border-end p-5">
          <div className="border border-2 rounded rounded-5" style={{ paddingTop: "50%", paddingBottom: "50%" }}>
            <Button variant="link" className="w-100">
              <Envelope style={{ width: '2em', height: '2em' }} />
            </Button>
          </div>
        </Col>

        <Col sm={ 12 } md={ 6 } className="border-start p-5">
          <div className="border border-2 rounded rounded-5" style={{ paddingTop: "50%", paddingBottom: "50%" }}>
              <ButtonGroup className="w-100">
                <Button variant="link" className="w-100">
                  <Discord style={{ width: '2em', height: '2em' }} />
                  Discord
                </Button>
                <Button variant="link" className="w-100">
                  <Discord style={{ width: '2em', height: '2em' }} />
                  Discord
                </Button>
              </ButtonGroup>
          </div>
        </Col>
      </Row>
        
    </div>
  );
};

export default ContactUs;
