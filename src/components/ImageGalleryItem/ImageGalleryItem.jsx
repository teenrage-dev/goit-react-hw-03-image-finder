import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    largeImageURL: '',
  };

  static propTypes = {
    photo: PropTypes.array,
    onOpen: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('click', this.handleClickList);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickList);
  }

  handleClickList = e => {
    console.dir(e.target);
    if (e.target.tagName === 'IMG') {
      this.props.onOpen(e.target.dataset.largeImg);
    }
  };
  // componentDidUpdate(prevProps, prevState) {}

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
