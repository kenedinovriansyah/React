import React from 'react';
import { ApplicationState } from '../../../configureStore';
import { DefaultState } from '../../../configureStore/types/interface';
import { Icons } from '../../../ref/icons';
import _ from 'lodash';
import camera from '../../../media/icons/camera.svg';
import info from '../../../media/icons/info-1.svg';
import down from '../../../media/icons/chevron-arrow-down.svg';

interface ContextProps {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  selector: ApplicationState;
  defaults: DefaultState;
  change(args: React.ChangeEvent<HTMLInputElement>, context: string): void;
  submit(args: React.FormEvent<HTMLFormElement>): void;
  clickSelect(args: string, id: string, type: string): void;
}

export const UserFormColsLeft: React.FC<ContextProps> = (
  props: React.PropsWithChildren<ContextProps>
) => {
  const { state, setState } = props;
  const changeFiles = (args: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      avatar: args.currentTarget.files[0],
      avatar_url: URL.createObjectURL(args.currentTarget.files[0]),
    });
  };
  return (
    <div className="create-upload-avatar">
      <div className="upload-avatar">
        <div className="upload-btn-wrapper">
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="avatar"
            onChange={changeFiles}
            accept=".jpg,jpeg,.png"
          />
          {state.avatar_url ? (
            <img src={state.avatar_url} alt="" className="avatar" />
          ) : (
            <div className="child-upload-avatar">
              <Icons src={camera} className="icons" />
              <span>Upload photo</span>
            </div>
          )}
        </div>
      </div>
      <div className="title">
        <span>Allowed *.jpeg, *.jpg, *.png, *.gif</span>{' '}
        <span>max size of 3.1 MB</span>
      </div>
    </div>
  );
};

export const UserFormColsRight: React.FC<ContextProps> = (
  props: React.PropsWithChildren<ContextProps>
) => {
  const { state, setState, selector, defaults, change, submit, clickSelect } =
    props;
  return (
    <form onSubmit={submit} className="app-form">
      <div className="field" id="field-group">
        <div className="field" id="field-input">
          <input
            type="text"
            name="username"
            id="username"
            className="username"
            placeholder="Username"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.username}
            onChange={(args) => change(args, 'username')}
            required
          />
        </div>
        <div className="field" id="field-input">
          <input
            type="email"
            name="email"
            id="email"
            className="email"
            placeholder="Email Address"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.email}
            onChange={(args) => change(args, 'email')}
            required
          />
        </div>
      </div>
      <div className="field" id="field-group">
        <div className="field" id="field-input">
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="first_name"
            placeholder="First Name"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.first_name}
            onChange={(args) => change(args, 'first_name')}
            required
          />
        </div>
        <div className="field" id="field-input">
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="last_name"
            placeholder="Last Name"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.last_name}
            onChange={(args) => change(args, 'last_name')}
            required
          />
        </div>
      </div>
      <div className="field" id="field-group">
        <div id="app-menu">
          <div className="field" id="field-input">
            <input
              type="text"
              name="gender"
              id="gender"
              className="gender"
              placeholder="Gender"
              autoComplete="off"
              readOnly={selector.default.message.loading}
              value={state.gender}
              onChange={(args) => change(args, 'gender')}
              required
            />
            <div className="box">
              <Icons src={down} className="icons" />
            </div>
          </div>
          <div className={state.genderDropdown ? 'dropdown' : 'hidden'}>
            <div className="dropdown-list">
              {_.map(selector.default.default.gender, (base, index) => {
                return (
                  <a
                    href="#"
                    key={index}
                    onClick={clickSelect.bind(
                      base,
                      base.name,
                      base.id,
                      'gender'
                    )}
                  >
                    {base.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div id="app-menu">
          <div className="field" id="field-input">
            <input
              type="text"
              name="type"
              id="type"
              className="type"
              placeholder="Type"
              autoComplete="off"
              readOnly={selector.default.message.loading}
              value={state.type}
              onChange={(args) => change(args, 'type')}
              required
            />
            <div className="box">
              <Icons src={down} className="icons" />
            </div>
          </div>
          <div className={state.typeDropdown ? 'dropdown' : 'hidden'}>
            <div className="dropdown-list">
              {_.map(selector.default.default.employe, (base, index) => {
                return (
                  <a
                    href="#"
                    key={index}
                    onClick={clickSelect.bind(base, base.name, base.id, 'type')}
                  >
                    {base.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="field" id="field-group">
        <div className="field" id="field-input">
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            className="phone_number"
            placeholder="Phone Number"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.phone_number}
            onChange={(args) => change(args, 'phone_number')}
            required
          />
        </div>
        <div className="field" id="field-input">
          <input
            type="text"
            name="country"
            id="country"
            className="country"
            placeholder="Country"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.country}
            onChange={(args) => change(args, 'country')}
            required
          />
        </div>
      </div>
      <div className="field" id="field-group">
        <div className="field" id="field-input">
          <input
            type="text"
            name="state"
            id="state"
            className="state"
            placeholder="State/Region"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.state}
            onChange={(args) => change(args, 'state')}
            required
          />
        </div>
        <div className="field" id="field-input">
          <input
            type="text"
            name="city"
            id="city"
            className="city"
            placeholder="City"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.city}
            onChange={(args) => change(args, 'city')}
            required
          />
        </div>
      </div>
      <div className="field" id="field-group">
        <div className="field" id="field-input">
          <input
            type="text"
            name="address"
            id="address"
            className="address"
            placeholder="Address"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.address}
            onChange={(args) => change(args, 'address')}
            required
          />
        </div>
        <div className="field" id="field-input">
          <input
            type="text"
            name="postal_code"
            id="postal_code"
            className="postal_code"
            placeholder="Postal Code"
            autoComplete="off"
            readOnly={selector.default.message.loading}
            value={state.postal_code}
            onChange={(args) => change(args, 'postal_code')}
            required
          />
        </div>
      </div>
      <div id="field-description">
        <Icons src={info} className="icons" />
        <span>
          Make sure the email address is active because we will send the
          password automatically to the user
        </span>
      </div>
      <div className="field" id="field-button">
        <button
          type={selector.default.message.loading ? 'button' : 'submit'}
          id={selector.default.message.loading ? 'loading' : ''}
        >
          <span>Save Changes</span>
          {selector.default.message.loading ? (
            <div className="spin"></div>
          ) : null}
        </button>
      </div>
    </form>
  );
};
