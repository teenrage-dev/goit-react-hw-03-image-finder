import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Button } from './Button/Button';

export class App extends Component {
  state = {
    value: '',
    page: 1,
  };

  handleSubmitForm = value => {
    this.setState({ value });
    // console.log(value);
  };

  // onLoadMore = page => {
  //   console.log('load more', this.state.page);
  //   console.log(page);
  //   this.setState({ page });
  // };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ImageGallery value={this.state.value} />
        {/* <Button onClick={this.loadMore} /> */}
      </div>
    );
  }
}
