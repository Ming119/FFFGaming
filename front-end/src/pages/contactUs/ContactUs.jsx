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
          <div className="border border-2 rounded rounded-5">
            <Button variant="link" className="w-100" style={{ paddingTop: "40%", paddingBottom: "40%" }}>
              <Envelope style={{ width: '2em', height: '2em' }} /><br />
              Email
            </Button>
          </div>
        </Col>

        <Col sm={ 12 } md={ 6 } className="border-start p-5">
          <div className="border border-2 rounded rounded-5">
              <ButtonGroup className="w-100">
                <Button variant="link" className="w-100" style={{ paddingTop: "40%", paddingBottom: "40%" }}>
                  <Discord style={{ width: '2em', height: '2em' }} /> <br />
                  Discord 私訊
                </Button>
                <Button variant="link" className="w-100" style={{ paddingTop: "40%", paddingBottom: "40%" }}>
                  <Discord style={{ width: '2em', height: '2em' }} /><br />
                  加入 Discord 群組
                </Button>
              </ButtonGroup>
          </div>
        </Col>
      </Row>
        
    </div>
  );
};

export default ContactUs;
