import axios, { AxiosResponse, Method } from 'axios';
import React from 'react';
import { Dispatch } from 'redux';
import { ColsRightStateActions } from '../../context/cols.right';
import { allDispatch } from '../extensions/dispatch';
import { DefaultTypes, UserTypes } from '../types/enum';
import { User } from '../types/interface';

export interface ActionsType {
  auth: boolean;
  json: boolean;
  dataForm?: FormData;
  data?: User;
  status: number;
  url: string;
  method: Method;
  params?: {
    single?: string;
    array?: any[];
  };
  type?: {
    name?: string;
    value?: any;
    child_value?: any;
  };
  state?: ColsRightStateActions;
  stateActions?: React.Dispatch<React.SetStateAction<ColsRightStateActions>>;
}

class AllActions {
  constructor() {}
  public header(context: boolean, method: Method, json: boolean) {
    let headers: any, methods: Method, type: string;
    if (json) {
      type = 'application/json';
    } else {
      type = 'multipart/form-data';
    }
    switch (method) {
      case 'post':
        methods = 'POST';
        break;
      case 'delete':
        methods = 'DELETE';
        break;
      case 'put':
        methods = 'PUT';
        break;
      default:
        break;
    }
    if (context) {
      headers = {
        'Access-Control-Allow-Methods': methods,
        'Access-Control-Allow-Headers':
          'Content-Type, Origin, Accepted, X-Requested-With, Authorization',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': type,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
    } else {
      headers = {
        'Access-Control-Allow-Methods': methods,
        'Access-Control-Allow-Headers':
          'Content-Type, Origin, Accepted, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': type,
      };
    }
    return headers;
  }

  non_message() {
    return [
      '/api-auth-token/',
      '/api/v1/user/accounts/me/',
      '/api/v1/default/',
      '/api/v1/product/category/ext/all/',
      '/api/v1/product/all/',
    ];
  }

  public fetch_product() {
    return ['/api/v1/product/all/', '/api/v1/product/category/ext/all/'];
  }

  credentials() {
    return ['/api-token-auth/'];
  }

  public message(
    context: ActionsType,
    dispatch: Dispatch,
    res: AxiosResponse<any>
  ) {
    // for filter product
    let name_ = '',
      pull_product = '/product/all/?page=',
      pull_category = '/category/ext/all/?page=',
      product = 'api/v1/product/',
      pull = [];
    pull.unshift(context.url);
    const _pull =
      pull.filter((x) => x.indexOf(pull_product) > -1)[0] ||
      pull.filter((x) => x.indexOf(pull_category) > -1)[0];

    // not have message

    if (!this.non_message().includes(context.url)) {
      if (!_pull) {
        allDispatch.defaultDispatch(
          dispatch,
          {
            message: allDispatch.validatorSuccess(res.data),
            loading: false,
            color: 1,
            valid: 1,
          },
          'message'
        );
      }
    }

    if (context.method === 'get') {
      const splits = context.url.split('/');
      const name = splits[splits.length - 2];
      if (this.fetch_product().includes(context.url) || _pull) {
        // fetch product
        name_ += splits[splits.length - 3];
        name_ += name;
        if (pull.filter((x) => x.indexOf(pull_product) > -1)[0]) {
          name_ = 'pull_product';
        } else if (pull.filter((x) => x.indexOf(pull_category) > -1)[0]) {
          name_ = 'pull_category';
        }
        if (context.params) {
          name_ = 'search-product';
        }
        allDispatch.productdispatch(dispatch, res, name_);
      } else {
        allDispatch.userdispatch(dispatch, res, name);
      }
    } else {
      // fetch user and employe
      if (pull.filter((x) => x.indexOf(product) > -1)[0]) {
        allDispatch.productdispatch(dispatch, res, context);
      } else {
        allDispatch.userdispatch(dispatch, res, context);
      }
      if (context.type.name !== 'updated_accounts') {
        dispatch({
          type: DefaultTypes.reset,
          payload: {
            reset: true,
          },
        });
      }
    }
  }

  public params(context: ActionsType) {
    let data: any = null;
    if (context.params) {
      data = {
        name: context.params.single,
      };
    }
    return data;
  }

  public all(context: ActionsType) {
    return async (dispatch: Dispatch) => {
      return await axios({
        url: context.url,
        params: this.params(context),
        data: context.json ? context.data : context.dataForm,
        headers: this.header(context.auth, context.method, context.json),
        method: context.method,
        maxContentLength: 2000,
        maxRedirects: 5,
        responseType: 'json',
        withCredentials: context.auth,
        validateStatus: (status: number) =>
          context.status >= context.status && status < 300,
        transformResponse: [
          function (data) {
            return data;
          },
        ],
      })
        .then((res: AxiosResponse<any>) => {
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            window.location.reload();
          } else {
            this.message(context, dispatch, res);
          }
        })
        .catch((err) => {
          if (context.auth) {
            allDispatch.defaultDispatch(
              dispatch,
              {
                message: allDispatch.validatorErrorAuth(err.response.data, err),
                loading: false,
                color: 0,
                valid: 1,
              },
              'message'
            );
          } else {
            allDispatch.defaultDispatch(
              dispatch,
              {
                message: allDispatch.validatorError(err.response.data),
                loading: false,
                color: 0,
                valid: 1,
              },
              'message'
            );
          }
        });
    };
  }
}

export const allActions = new AllActions();
