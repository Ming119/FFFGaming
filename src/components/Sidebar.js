import React, {useState} from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import '../assets/css/sidebar.css';
import Products from '../pages/sidebar/Products';
import { useLoaderData } from 'react-router-dom';

export const Sidebar = (props) => {

  const { categories, products } = useLoaderData();
  const [activeTab, setActiveTab] = useState('AllProducts');

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  return (
      <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
          <Col sm={3}>
            <Nav className="list-unstyled ps-0 p-3 flex-column">
              <Nav.Item className="mb-1">
                <Nav.Link
                  as="button"
                  className="btn btn-no-toggle align-items-center rounded"
                  eventKey="AllProducts"
                >
                  全部產品
                </Nav.Link>
              </Nav.Item>
              { categories.map((category) => (
                <Nav.Item className="mb-1" key={category.id}>
                  <Nav.Link
                    as="button"
                    className="btn btn-toggle align-items-center rounded collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${category.id}`}
                    aria-expanded="true"
                  >
                    {category.name}
                  </Nav.Link>
                  <div className="collapse show" id={`collapse${category.id}`}>
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      { category.sub.map((subcategory) => (
                        <li key={`${category.id}_${subcategory.id}`}>
                          <Nav.Link className="link-dark rounded" eventKey={`${category.id}_${subcategory.id}`}>{subcategory.name}</Nav.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Nav.Item>
              )) }
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

          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="AllProducts">
                <Products title={"全部產品"} products={ products }/>
              </Tab.Pane>
              { categories.map((category) => (
                category.sub.map((subcategory) => (
                  <Tab.Pane eventKey={`${category.id}_${subcategory.id}`} key={`${category.id}_${subcategory.id}`}>
                    <Products
                      title={`${category.name} - ${subcategory.name}`}
                      products={ products.filter(product => product.category === `${category.id}_${subcategory.id}`) }/>
                  </Tab.Pane>
                ))
              )) }
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
