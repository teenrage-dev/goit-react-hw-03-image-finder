import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    value: '',
  };
  handleSubmitForm = value => {
    this.setState({ value });
    console.log(value);
  };
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
      </div>
    );
  }
}
