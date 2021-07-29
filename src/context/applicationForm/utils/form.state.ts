import React from 'react';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../../configureStore';
import { allActions } from '../../../configureStore/actions/all.actions';
import { allDispatch } from '../../../configureStore/extensions/dispatch';
import { DefaultState } from '../../../configureStore/types/interface';
import { FormState } from '../create.form';

class FormStateField {
  constructor() {}

  public state() {
    return {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      gender: '',
      genderId: '',
      genderDropdown: false,
      type: '',
      typeId: '',
      typeDropdown: false,
      phone_number: '',
      country: '',
      state: '',
      city: '',
      address: '',
      postal_code: '',
      avatar: null,
      avatar_url: '',
      description: '',
      name: '',
      arrayImage: [],
      price: '',
      sales_price: '',
      category: '',
      genders: [],
      sku: '',
      code: '',
    };
  }

  public clear(
    state: FormState,
    setState: React.Dispatch<React.SetStateAction<FormState>>
  ) {
    setState({
      ...state,
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      gender: '',
      genderId: '',
      genderDropdown: false,
      type: '',
      typeId: '',
      typeDropdown: false,
      phone_number: '',
      country: '',
      state: '',
      city: '',
      address: '',
      postal_code: '',
      avatar: null,
      avatar_url: '',
      description: '',
      name: '',
      arrayImage: [],
      price: '',
      sales_price: '',
      category: '',
      genders: [],
      sku: '',
      code: '',
    });
  }

  public updateUser(
    state: FormState,
    setState: React.Dispatch<React.SetStateAction<FormState>>,
    selector: ApplicationState,
    defaults: DefaultState
  ) {
    setState({
      ...state,
      first_name: selector.default.drawer.context.first_name,
      last_name: selector.default.drawer.context.last_name,
      username: selector.default.drawer.context.username,
      email: selector.default.drawer.context.email,
      gender: selector.default.drawer.context.accounts.name_gender,
      genderId: selector.default.drawer.context.accounts.gender,
      genderDropdown: false,
      type: selector.default.drawer.context.accounts.type.name,
      typeId: selector.default.drawer.context.accounts.type.type,
      typeDropdown: false,
      phone_number:
        selector.default.drawer.context.accounts.phone.phone_numbers,
      country: selector.default.drawer.context.accounts.address.country,
      state: selector.default.drawer.context.accounts.address.state,
      city: selector.default.drawer.context.accounts.address.city,
      address: selector.default.drawer.context.accounts.address.address,
      postal_code: selector.default.drawer.context.accounts.address.postal_code,
      avatar: null,
      avatar_url: defaults.drawer.context.accounts.avatar,
    });
  }

  public input_field(
    args: React.ChangeEvent<HTMLInputElement>,
    context: string,
    state: FormState,
    setState: React.Dispatch<React.SetStateAction<FormState>>,
    selector: ApplicationState
  ) {
    switch (context) {
      case 'first_name':
        setState({
          ...state,
          first_name: args.currentTarget.value,
        });
        break;
      case 'last_name':
        setState({
          ...state,
          last_name: args.currentTarget.value,
        });
        break;
      case 'gender':
        const gender = selector.default.default.gender.filter(
          (x) => x.name.indexOf(args.currentTarget.value) > -1
        )[0];
        let is_done: boolean = true;
        if (gender) {
          if (gender.name === args.currentTarget.value) {
            is_done = false;
          }
        }
        setState({
          ...state,
          gender: args.currentTarget.value,
          genderDropdown:
            args.currentTarget.value.length >= 1 ? is_done : false,
          genderId: gender ? gender.id : '0',
        });
        break;
      case 'type':
        const type = selector.default.default.employe.filter(
          (x) => x.name.indexOf(args.currentTarget.value) > -1
        )[0];
        let done: boolean = true;
        if (type) {
          if (type.name === args.currentTarget.value) {
            done = false;
          }
        }
        setState({
          ...state,
          type: args.currentTarget.value,
          typeDropdown: args.currentTarget.value.length >= 1 ? done : false,
          typeId: type ? type.id : '0',
        });
        break;
      case 'phone_number':
        setState({
          ...state,
          phone_number: args.currentTarget.value,
        });
        break;
      case 'username':
        setState({
          ...state,
          username: args.currentTarget.value,
        });
        break;
      case 'email':
        setState({
          ...state,
          email: args.currentTarget.value,
        });
        break;
      case 'country':
        setState({
          ...state,
          country: args.currentTarget.value,
        });
        break;
      case 'state':
        setState({
          ...state,
          state: args.currentTarget.value,
        });
        break;
      case 'city':
        setState({
          ...state,
          city: args.currentTarget.value,
        });
        break;
      case 'address':
        setState({
          ...state,
          address: args.currentTarget.value,
        });
        break;
      case 'postal_code':
        setState({
          ...state,
          postal_code: args.currentTarget.value,
        });
        break;
      case 'name':
        setState({
          ...state,
          name: args.currentTarget.value,
        });
        break;
      case 'price':
        setState({
          ...state,
          price: args.currentTarget.value,
        });
        break;
      case 'sales_price':
        setState({
          ...state,
          sales_price: args.currentTarget.value,
        });
        break;
      case 'category':
        setState({
          ...state,
          category: args.currentTarget.value,
        });
        break;
      case 'sku':
        setState({
          ...state,
          sku: args.currentTarget.value,
        });
        break;
      case 'code':
        setState({
          ...state,
          code: args.currentTarget.value,
        });
        break;
      default:
        break;
    }
  }

  public textarea_field(
    args: React.ChangeEvent<HTMLTextAreaElement>,
    type: string,
    state: FormState,
    setState: React.Dispatch<React.SetStateAction<FormState>>
  ) {
    switch (type) {
      case 'description':
        setState({
          ...state,
          description: args.currentTarget.value,
        });
        break;

      default:
        break;
    }
  }

  public submit(
    state: FormState,
    selector: ApplicationState,
    dispatch: Dispatch<any>,
    defaults: DefaultState
  ) {
    const data = new FormData();
    data.append('username', state.username);
    data.append('email', state.email);
    data.append('first_name', state.first_name);
    data.append('last_name', state.last_name);
    data.append('gender', state.genderId);
    data.append('type', state.typeId);
    data.append('phone', state.phone_number);
    data.append('country', state.country);
    data.append('state', state.state);
    data.append('city', state.city);
    data.append('address', state.address);
    data.append('postal_code', state.postal_code);
    if (state.avatar) {
      data.append('avatar', state.avatar);
    }

    allDispatch.defaultDispatch(
      dispatch,
      {
        message: '',
        valid: 0,
        color: 0,
        loading: true,
      },
      'message'
    );
    switch (selector.default.drawer.child_page) {
      case 'create':
        let owner: any = true;
        if (selector.default.drawer.context) {
          owner =
            selector.default.drawer.context.accounts.public_id !==
            selector.user.data.accounts.public_id;
        }
        if (owner) {
          data.append('types', 'employe');
        }
        dispatch(
          allActions.all({
            url: defaults.drawer.update
              ? !owner
                ? '/api/v1/user/updated/accounts/'
                : `/api/v1/user/updated/accounts/employe/${defaults.drawer.context.accounts.public_id}/`
              : '/api/v1/user/updated/accounts/',
            dataForm: data,
            status: 200,
            json: false,
            auth: true,
            method: 'post',
            type: {
              name: selector.default.drawer.record
                ? 'add_employe'
                : !owner
                ? 'updated_accounts'
                : 'update_employe',
              value: selector.default.drawer.context
                ? selector.default.drawer.context.accounts.public_id
                : '',
            },
          })
        );
        break;
      case 'create-product':
        console.log(state);
        break;
      default:
        break;
    }
  }
}

export const formfield = new FormStateField();
