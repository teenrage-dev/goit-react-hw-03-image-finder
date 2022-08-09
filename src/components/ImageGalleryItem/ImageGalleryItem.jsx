import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    largeImageURL: '',
  };

  componentDidMount() {
    console.log('componentDidMount');

    window.addEventListener('click', this.handleClickList);
    console.log('addEventListener');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');

    window.removeEventListener('click', this.handleClickList);
    console.log('removeEventListener');
  }

  handleClickList = e => {
    console.dir(e.target);
    console.log('handleClickList');
    console.log(e.target.dataset.largeImg);
    if (e.target.tagName === 'IMG') {
      this.props.onOpen(e.target.dataset.largeImg);
    }
  };
  // componentDidUpdate(prevProps, prevState) {}

  render() {
    const { photo } = this.props;
    console.log(photo);
    return (
      <>
        {photo.map(item => {
          console.log(item);
          return (
            <li className={css.ImageGalleryItem} key={item.id}>
              <img
                src={item.webformatURL}
                alt={item.tags}
                className={css.ImageGalleryItemImage}
                data-large-img={item.largeImageURL}
                loading="lazy"
              />
            </li>
          );
        })}
      </>
    );
  }
}
