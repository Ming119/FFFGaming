import { Component } from 'react';

export class ProductCard extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    );
  }
}

export default ProductCard;