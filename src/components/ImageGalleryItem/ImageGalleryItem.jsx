import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li className={css.ImageGalleryItem} key={item.id}>
        <img
          src={item.webformatURL}
          alt={item.tags}
          className={css.ImageGalleryItemImage}
        />
      </li>
    );
  }
}
