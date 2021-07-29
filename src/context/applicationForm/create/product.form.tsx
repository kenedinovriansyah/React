import React from 'react';
import { ApplicationState } from '../../../configureStore';
import { FormState } from '../create.form';
import folder from '../../../media/icons/folder.svg';
import { Icons } from '../../../ref/icons';
import down from '../.././../media/icons/chevron-arrow-down.svg';
import exit from '../../../media/icons/delete.svg';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { allActions } from '../../../configureStore/actions/all.actions';

interface ContextProps {
  selector: ApplicationState;
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
  change(args: React.ChangeEvent<HTMLInputElement>, type: string): void;
  changeTextarea(
    args: React.ChangeEvent<HTMLTextAreaElement>,
    type: string
  ): void;
  submit(args: React.FormEvent<HTMLFormElement>): void;
}

export const ProductFormLeft: React.FC<ContextProps> = (
  props: React.PropsWithChildren<ContextProps>
) => {
  const { state, selector, change, submit } = props;
  const dispatch = useDispatch();
  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(
        allActions.all({
          url: '/api/v1/product/code/',
          status: 200,
          json: true,
          auth: true,
          method: 'get',
        })
      );
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <form onSubmit={submit}>
      <div className="app-form" id="app-form-left">
        <div className="field" id="field-input">
          <input
            type="text"
            name="product_code"
            id="product_code"
            className="product_code"
            placeholder="Product Code"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.code}
            onChange={(args) => change(args, 'code')}
            required
          />
        </div>
        <div className="field" id="field-input">
          <input
            type="text"
            name="product_sku"
            id="product_sku"
            className="product_sku"
            placeholder="Product SKU"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.sku}
            onChange={(args) => change(args, 'sku')}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="">Gender</label>
          <div className="groups">
            <div className="group">
              <button className="box">
                <div className="box-border"></div>
              </button>
              <span>Men</span>
            </div>
            <div className="group">
              <button className="box">
                <div className="box-border"></div>
              </button>
              <span>Women</span>
            </div>
            <div className="group">
              <button className="box">
                <div className="box-border"></div>
              </button>
              <span>Kids</span>
            </div>
          </div>
        </div>
        <div className="field" id="field-input">
          <input
            type="text"
            name="category_product"
            id="category_product"
            className="category_product"
            placeholder="Category"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.category}
            onChange={(args) => change(args, 'category')}
            required
          />
          <Icons src={down} className="icons_" />
        </div>
      </div>
      <div className="app-form" id="app-form-left">
        <div className="field" id="field-input">
          <input
            type="text"
            name="price"
            id="price"
            className="price"
            placeholder="Price"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.price}
            onChange={(args) => change(args, 'price')}
            required
          />
        </div>
        <div className="field" id="field-input">
          <input
            type="text"
            name="sell"
            id="sell"
            className="sell"
            placeholder="Sales Price"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.sales_price}
            onChange={(args) => change(args, 'sales_price')}
            required
          />
        </div>
        <div className="field" id="field-button">
          <button>Create Product</button>
        </div>
      </div>
    </form>
  );
};

export const ProductFormRight: React.FC<ContextProps> = (
  props: React.PropsWithChildren<ContextProps>
) => {
  const { selector, state, setState, change, changeTextarea } = props;

  const changeFiles = (args: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      avatar: args.currentTarget.files[0],
      arrayImage: [
        ...state.arrayImage,
        URL.createObjectURL(args.currentTarget.files[0]),
      ],
    });
  };
  const removeAll = (args: React.MouseEvent<HTMLButtonElement>) => {
    args.preventDefault();
    setState({
      ...state,
      arrayImage: [],
    });
  };
  const removeSingle = (args: string) => {
    setState({
      ...state,
      arrayImage: state.arrayImage.filter((x) => x !== args),
    });
  };
  return (
    <div className="app-form">
      <div className="field" id="field-input">
        <input
          type="text"
          name="product_name"
          id="product_name"
          className="product_name"
          placeholder="Product Name"
          autoComplete="off"
          readOnly={selector.default.message.loading}
          value={state.name}
          onChange={(args) => change(args, 'name')}
          required
        />
      </div>
      <div className="field" id="field-textarea">
        <textarea
          name="description"
          id="description"
          className="description"
          placeholder="Description"
          value={state.description}
          onChange={(args) => changeTextarea(args, 'description')}
        ></textarea>
      </div>
      <div className="field">
        <label htmlFor="">Add Images</label>
        <div className="field-add-images">
          <div className="upload-btn-wrapper">
            <input
              type="file"
              name="picture"
              id="picture"
              onChange={changeFiles}
              accept=".jpeg,.jpg,.png"
            />
            <div className="add-image-cols">
              <Icons src={folder} className="icons" />
            </div>
            <div className="add-image-cols">
              <h2>Drop or Select file</h2>
              <span>Drop files here or click browse thorough your machine</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lists">
        {_.map(state.arrayImage, (base, index) => (
          <div className="images" key={index}>
            <img src={base} alt="" />
            <button onClick={removeSingle.bind(base, base)}>
              <Icons src={exit} className="icons" />
            </button>
          </div>
        ))}
      </div>
      <div className="field" id="field-group">
        <button>Upload Files</button>
        <button onClick={removeAll}>Remove All</button>
      </div>
    </div>
  );
};
