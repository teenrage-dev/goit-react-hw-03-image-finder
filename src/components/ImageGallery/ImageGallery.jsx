import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import { InfinitySpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import MovingComponent from 'react-moving-text';

// 'idle', 'pending', 'resolved', 'rejected'

export class ImageGallery extends Component {
  state = {
    photo: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (prevProps.value !== value) {
      this.setState({
        status: 'pending',
      });
      fetch(
        `https://pixabay.com/api/?q=${value}&page=1&key=28032528-2733f4db32465b2bae0fa9703&image_type=photo&orientation=horizontal&per_page=12`
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
          console.log(data);

          if (data.hits.length === 0) {
            toast.error('Error: No results found.');
          }
          return this.setState({
            photo: data,
            status: 'resolved',
          });
        })
        .catch(err => {
          // this.setState({
          //   status: 'rejected',
          // });
          toast.error(`${err}`);
        });
    }
  }

  render() {
    const { photo, status } = this.state;

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

    if (status === 'resolved') {
      return (
        <ul className={css.ImageGallery}>
          {photo.hits.map(item => {
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

    // return (
    //   <>
    //     <ul className={css.ImageGallery}>
    //       {this.state.photo &&
    //         photo.hits.map(item => {
    //           return (
    //             <li className={css.ImageGalleryItem} key={item.id}>
    //               <img
    //                 src={item.webformatURL}
    //                 alt={item.tags}
    //                 className={css.ImageGalleryItemImage}
    //               />
    //             </li>
    //           );
    //         })}
    //     </ul>
    //   </>
    // );
  }
}
