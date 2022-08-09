import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

// const ImageGalleryList = document.querySelector('#ImageGallery');
export class ImageGalleryItem extends Component {
  // componentDidMount() {
  //   console.log('componentDidMount');

  //   ImageGalleryList.addEventListener('click', this.handleClickList);
  //   console.log('addEventListener');
  // }
  // componentWillUnmount() {
  //   console.log('componentWillUnmount');

  //   ImageGalleryList.removeEventListener('click', this.handleClickList);
  //   console.log('removeEventListener');
  // }

  handleClickList = e => {
    console.log(e.target);
  };

  render() {
    const { photo } = this.props;
    return (
      <>
        {photo.map(item => {
          return (
            <li className={css.ImageGalleryItem} key={item.id}>
              <img
                src={item.webformatURL}
                alt={item.tags}
                className={css.ImageGalleryItemImage}
              />
            </li>
          );
        })}
      </>
    );
  }
}
