import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import { InfinitySpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import MovingComponent from 'react-moving-text';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

// 'idle', 'pending', 'resolved', 'rejected'

export class ImageGallery extends Component {
  state = {
    photo: null,
    status: 'idle',
    page: 1,
    error: null,
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    const { page } = this.state;

    console.log(prevState.page, page);

    if (prevProps.value !== value || prevState.page !== page) {
      console.log(page);

      this.setState({
        status: 'pending',
      });
      fetch(
        `https://pixabay.com/api/?q=${value}&page=${page}&key=28032528-2733f4db32465b2bae0fa9703&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          console.log(res);
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(
              `The query with the name ${value} does not exist. Try another one.`
            )
          );
        })
        .then(data => {
          if (data.hits.length === 0) {
            return Promise.reject(new Error(`No results found.`));
          }
          return this.setState({
            photo: data,
            status: 'resolved',
          });
        })
        .catch(err => {
          this.setState({
            status: 'rejected',
            error: err,
          });
        });
    }
  }

  render() {
    const { photo, status, error } = this.state;

    if (status === 'idle') {
      return (
        <div className={css.ImageGalleryWrapper}>
          <MovingComponent
            type="pulse"
            duration="1000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="infinite"
            fillMode="none"
          >
            <h2 className={css.IdleText}> Enter The Text</h2>
          </MovingComponent>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className={css.ImageGalleryContainer}>
          <InfinitySpin width="200" color="#3f51b5" />
        </div>
      );
    }

    if (status === 'rejected') {
      return <div>{toast.error(`${error}`)}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {photo.hits.map(item => {
              return <ImageGalleryItem item={item} />;
            })}
          </ul>
          <Button onClick={this.loadMore} />
        </>
      );
    }
  }
}
