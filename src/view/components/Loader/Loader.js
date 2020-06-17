import React from 'react';
import './loader.css';
export default function Loader({ ...props }) {
  return (
    <div class="spinner" {...props}>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  );
}
