import React, { useState } from 'react';
import { Col, Nav, NavDropdown, Row, Tab, Button, Collapse } from 'react-bootstrap';
import AllProducts from '../pages/sidebar/AllProducts';
import NewProducts from '../pages/sidebar/NewProducts';
import PopularProducts from '../pages/sidebar/PopularProducts';

export const Sidebar = (props) => {
  const [open, setOpen] = useState(false);

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="AllProducts">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <h3>Product Categories</h3>
              <Nav.Item>
                <Nav.Link eventKey="AllProducts">All Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="NewProducts">New Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="PopularProducts">Popular Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}          
                >
                  {open ? <i class="bi bi-chevron-down"></i> : <i class="bi bi-chevron-right"></i>}
                  <span>3C Products</span>
                </Nav.Link>
                <Collapse in={open}>
                  <div>
                    <Nav.Item>
                      <Nav.Link eventKey="ProductTest">Product Test</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="test1">test 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="test2">test 2</Nav.Link>
                    </Nav.Item>
                  </div>
                </Collapse>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="AllProducts">
                <AllProducts />
              </Tab.Pane>
              <Tab.Pane eventKey="NewProducts">
                <NewProducts />
              </Tab.Pane>
              <Tab.Pane eventKey="PopularProducts">
                <PopularProducts />
              </Tab.Pane>
              <Tab.Pane eventKey="ProductTest">
                <h3>Product Test</h3>
              </Tab.Pane>
              <Tab.Pane eventKey="test1">
                <h3>test1</h3>
              </Tab.Pane>
              <Tab.Pane eventKey="test2">
                <h3>test2</h3>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
};

export default Sidebar;
