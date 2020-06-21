// @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { MARKET_ADDRESS } from '../../../config';
import { getManagers } from '../../../ipfs';
import Button from '../Button';
import { ModalContext } from '../Modal/Modal';
import setSellItemInfo from '../../../store/actions/sellModalForm';
import './sellerModalForm.scss';

function SellerModalForm(...props) {
  const useModalContext = React.useContext(ModalContext);
  const [item, setItem] = React.useState({
    name: '',
    price: '',
    count: '',
    size: '',
    style: '',
    color: '',
    category: '',
    type: ''
  });
  const dropArea = React.createRef(null);
  const [files, setFiles] = React.useState([]);
  const [areaDropClass, setAreaDropClass] = React.useState('unhighlight');
  function handleChange(evt) {
    const { value, name } = evt.target;

    setItem({
      ...item,
      [name]: value
    });
  }
  React.useEffect(() => {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.current.addEventListener(
        eventName,
        function(e) {
          e.preventDefault();
          e.stopPropagation();
        },
        false
      );
    });
  }, []);
  function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
    return false;
  }

  function highlight(e) {
    setAreaDropClass('highlight');
    return false;
  }
  function unhighlight(e) {
    setAreaDropClass('unhighlight');
    return false;
  }
  async function handleFiles(e) {
    setFiles([...files, await getBase64(e.target.files[0])]);
    let dt = e.dataTransfer;
    files.forEach(uploadFile);
    return false;
  }
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((res, rej) => {
      reader.onload = function() {
        res(reader.result);
      };
      reader.onerror = function(error) {
        reader(error);
      };
    });

    return reader.result;
  }
  async function handleAddItem() {
    useModalContext.setLoading(true);
    const { publicKey } = JSON.parse(localStorage.getItem('account'));
    const { itemManager, orderManager } = await getManagers();
    const cid = await itemManager.add(
      publicKey,
      item.name,
      item.price,
      item.category,
      item.type,
      item.count,
      item.size,
      item.colour,
      [files]
    );
    const available = await ThanosWallet.isAvailable();
    if (!available) {
      console.log('Thanos Wallet not installed');
    }
    const wallet = new ThanosWallet('Cepheus');
    await wallet.connect('carthagenet', { forcePermission: true });
    const tezos = wallet.toTezos();
    const contract = await tezos.wallet.at(MARKET_ADDRESS);
    const operation = await contract.methods
      .addItem(cid.string, item.price)
      .send();
    await operation.confirmation();
    useModalContext.setLoading(false);
  }
  function uploadFile(file) {
    // var url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ';
    // var xhr = new XMLHttpRequest();
    // var formData = new FormData();
    // xhr.open('POST', url, true);
    // xhr.addEventListener('readyitemchange', function(e) {
    //   if (xhr.readyState == 4 && xhr.status == 200) {
    //     // Готово. Информируем пользователя
    //   } else if (xhr.readyState == 4 && xhr.status != 200) {
    //     // Ошибка. Информируем пользователя
    //   }
    // });
    // formData.append('file', file);
    // xhr.send(formData);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <form className="seller-items__modal_form">
        <Field
          className=" seller-modal__item"
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Name"
          component="input"
        />
        <Field
          className=" seller-modal__item"
          type="text"
          value={item.price}
          onChange={handleChange}
          component="input"
          name="price"
          placeholder="Price"
        />
        <Field
          className=" seller-modal__item"
          type="text"
          name="category"
          value={item.category}
          placeholder="Category"
          component="input"
        />
        <Field
          className=" seller-modal__item"
          type="text"
          name="type"
          value={item.type}
          placeholder="Type"
          component="input"
        />
        <Field
          className=" seller-modal__item"
          type="text"
          name="count"
          value={item.count}
          onChange={handleChange}
          placeholder="Count"
          component="input"
        />
        <Field
          className=" seller-modal__item"
          type="text"
          value={item.size}
          onChange={handleChange}
          placeholder="Size"
          component="input"
          name="size"
        />
        <Field
          className=" seller-modal__item"
          type="text"
          value={item.style}
          onChange={handleChange}
          placeholder="Style"
          component="input"
          name="style"
        />
        <Field
          className=" seller-modal__item"
          type="text"
          value={item.color}
          onChange={handleChange}
          placeholder="Color"
          component="input"
          name="color"
        />
      </form>
      <div
        id="drop-area"
        ref={dropArea}
        className={areaDropClass}
        drop={handleDrop}
        onDragEnter={highlight}
        onDragOver={highlight}
        onDragLeave={unhighlight}
        onDragDrop={unhighlight}
      >
        <form class="my-form">
          <p>Drop your photos here</p>
          <input
            type="file"
            id="fileElem"
            multiple
            accept="image/*"
            onChange={handleFiles}
          />
          <label class="button" for="fileElem">
            Upload photos
          </label>
        </form>
        <label>Files uploaded: {files.length}</label>
      </div>
      <div className="modal-footer">
        <Button className=" purple buy-btn " onClick={handleAddItem}>
          Add item
        </Button>
      </div>
    </div>
  );
}

// const mapStateToProps = item => ({
//     sellItemInfoList: item.sellItemInfoList,
//

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(setSellItemInfo, dispatch)
});

SellerModalForm = connect(null, mapDispatchToProps)(SellerModalForm);

export default reduxForm({
  form: 'sellModal',
  destroyOnUnmount: false
})(SellerModalForm);
