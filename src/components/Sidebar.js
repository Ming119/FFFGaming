import React, {useState} from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import '../assets/css/sidebar.css';
import Products from '../pages/sidebar/Products';


export const Sidebar = (props) => {

  const [activeTab, setActiveTab] = useState('AllProducts');

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  return (
      <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
        <div class="flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}>
          <Col sm={3}>
              <Nav className="list-unstyled ps-0">
                <Nav.Item className="mb-1">
                  <Nav.Link
                    as="button"
                    className="btn btn-no-toggle align-items-center rounded"
                    eventKey="AllProducts"
                  >
                    全部產品
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-1">
                  <Nav.Link
                    as="button"
                    className="btn btn-no-toggle align-items-center rounded"
                    eventKey="MouseProducts"
                  >
                    滑鼠墊專區
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-1">
                  <Nav.Link
                    as="button"
                    className="btn btn-toggle align-items-center rounded collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                    aria-expanded="true"
                  >
                    X-raypad
                  </Nav.Link>
                  <div className="collapse show" id="collapse1">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="X-raypad1">粗面亂紋</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="X-raypad2">細面</Nav.Link>
                      </li>
                    </ul>
                  </div>
                </Nav.Item>
                <Nav.Item className="mb-1" style={{ weight: 'auto'}}>
                  <Nav.Link
                    as="button"
                    className="btn btn-toggle align-items-center rounded collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse2"
                    aria-expanded="true"
                  >
                    電競周邊
                  </Nav.Link>
                  <div className="collapse show" id="collapse2">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="GamingPeripheral1">萬能鼠貼/防滑貼</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="GamingPeripheral_Logitech">Logitech</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="GamingPeripheral_Ninjuso">Ninjuso</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="GamingPeripheral_PULSAR">PULSAR</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="GamingPeripheral_FinalMouse">Final mouse</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="GamingPeripheral_VGN">VGN</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="GamingPeripheral_LAMZU">LAMZU</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="GamingPeripheral_Razer">Razer</Nav.Link>
                      </li>
                    </ul>
                  </div>
                </Nav.Item>
                <Nav.Item className="mb-1">
                  <Nav.Link
                    as="button"
                    className="btn btn-toggle align-items-center rounded collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="true"
                  >
                    滑鼠專區
                  </Nav.Link>
                  <div className="collapse show" id="collapse3">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="Mouses_Ninjuso">Ninjuso</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="Mouses_VGN">VGN</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link className="link-dark rounded" eventKey="Mouses_LAMZU">LAMZU</Nav.Link>
                      </li>
                    </ul>
                  </div>
                </Nav.Item>
                <Nav.Item className="mb-1">
                  <Nav.Link
                    as="button"
                    className="btn btn-no-toggle align-items-center rounded"
                    aria-expanded="false"
                    eventKey="DIY"
                  >
                    客製化專區
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </div>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="AllProducts">
                <Products title={"全部產品"} />
              </Tab.Pane>
              <Tab.Pane eventKey="MouseProducts">
                <Products title={"滑鼠墊專區"} />
              </Tab.Pane>
              <Tab.Pane eventKey="X-raypad1">
                <Products title={"粗面亂紋"} />
              </Tab.Pane>
              <Tab.Pane eventKey="X-raypad2">
                <Products title={"細面"} />
              </Tab.Pane>
              <Tab.Pane eventKey="GamingPeripheral1">
                <Products title={"GamingPeripheral_萬能鼠貼/防滑貼"} />
              </Tab.Pane>
              <Tab.Pane eventKey="GamingPeripheral_Logitech">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="GamingPeripheral_Ninjuso">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="GamingPeripheral_PULSAR">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="GamingPeripheral_FinalMouse">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="GamingPeripheral_VGN">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="GamingPeripheral_LAMZU">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="GamingPeripheral_Razer">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="Mouses_Ninjuso">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="Mouses_VGN">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="Mouses_LAMZU">
                <Products title={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="DIY">
              <Products title={"客製化專區"} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
  );
};

export default Sidebar;
