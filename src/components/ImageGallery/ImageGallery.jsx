import { Component } from 'react';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    photo: null,
  };

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (prevProps.value !== value) {
      fetch(
        `https://pixabay.com/api/?q=${value}&page=1&key=28032528-2733f4db32465b2bae0fa9703&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          return this.setState({
            photo: data,
          });
        });
    }
  }

  render() {
    const { photo } = this.state;

    // console.log(photo);

    return (
      <ul className={css.ImageGallery}>
        {this.state.photo &&
          photo.hits.map(item => {
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
      </ul>
    );
  }
}
