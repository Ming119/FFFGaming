import { Col, Nav, Row, Tab } from 'react-bootstrap';
import AllProducts from '../pages/sidebar/AllProducts';
import NewProducts from '../pages/sidebar/NewProducts';
import PopularProducts from '../pages/sidebar/PopularProducts';

export const Sidebar = (props) => {

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="NewProducts">
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
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
};

export default Sidebar;
