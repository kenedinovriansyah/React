import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { DefaultTypes, ProductType, UserTypes } from '../types/enum';

interface Message {
  non_field_errors: any[];
  message: string;
}

class AllDispatch {
  constructor() {}

  public validatorSuccess(context: Message) {
    if (context.message) {
      return context.message;
    }
  }
  public validatorErrorAuth(context: Message, err: any) {
    if (err.response.data.detail) {
      localStorage.clear();
      window.location.reload();
    }
    if (context.message) {
      return context.message;
    } else if (context.non_field_errors) {
      return context.non_field_errors[0];
    }
  }

  public validatorError(context: Message) {
    if (context.message) {
      return context.message;
    } else if (context.non_field_errors) {
      return context.non_field_errors[0];
    }
  }

  public defaultDispatch(dispatch: Dispatch, args: any, type: string) {
    switch (type) {
      case 'drawer':
        dispatch({
          type: DefaultTypes.drawer,
          payload: {
            drawer: {
              active: args.active,
              page: args.page,
              child_page: args.child_page,
              title: args.title,
              breadcrumbs: args.breadcrumbs,
              update: args.update,
              context: args.context,
              record: args.record,
              parent_page: args.parent_page,
            },
          },
        });
        break;
      case 'hidden':
        dispatch({
          type: DefaultTypes.hidden,
          payload: {
            hidden: args,
          },
        });
        break;
      case 'loading':
        dispatch({
          type: DefaultTypes.loading,
          payload: {
            loading: args,
          },
        });
        break;
      case 'message':
        dispatch({
          type: DefaultTypes.message,
          payload: {
            message: args.message,
            loading: args.loading,
            valid: args.valid,
            color: args.color,
          },
        });
        break;
      case 'reset':
        dispatch({
          type: DefaultTypes.reset,
          payload: {
            reset: args,
          },
        });
        break;
      case 'token':
        dispatch({
          type: DefaultTypes.token,
          payload: {
            token: args,
          },
        });
        break;
      case 'sort':
        dispatch({
          type: UserTypes.sort_employe,
          payload: {
            data: args,
          },
        });
        break;
      case 'search-user':
        dispatch({
          type: UserTypes.search_employe,
          payload: {
            data: args,
          },
        });
        break;
      default:
        break;
    }
  }

  public productdispatch(
    dispatch: Dispatch,
    res: AxiosResponse<any>,
    context: any
  ) {
    switch (context) {
      case 'extall':
        dispatch({
          type: ProductType.list_category,
          payload: {
            data: res.data,
          },
        });
        break;
      case 'productall':
        dispatch({
          type: ProductType.list_product,
          payload: {
            data: res.data,
          },
        });
        break;
      case 'pull_product':
        dispatch({
          type: ProductType.pull_product,
          payload: {
            data: res.data,
          },
        });
        break;
      case 'search-product':
        dispatch({
          type: ProductType.search_product,
          payload: {
            data: res.data.results,
          },
        });
        break;
      case 'productcode':
        console.log('Hello Wolrds');
        break;
      default:
        break;
    }

    if (context.type) {
      switch (context.type.name) {
        case 'destroy_product':
          dispatch({
            type: ProductType.destroy_product,
            payload: {
              category: context.type.value,
              product: context.type.child_value,
            },
          });
          break;

        default:
          break;
      }
    }
  }

  public userdispatch(
    dispatch: Dispatch,
    res: AxiosResponse<any>,
    context: any
  ) {
    switch (context) {
      case 'me':
        dispatch({
          type: UserTypes.me,
          payload: {
            data: res.data,
          },
        });
        break;
      case 'default':
        dispatch({
          type: DefaultTypes.free_json,
          payload: {
            default: res.data,
          },
        });
        break;
      default:
        break;
    }
    if (context.type) {
      switch (context.type.name) {
        case 'destroy_employe':
          dispatch({
            type: UserTypes.destroy_employe,
            payload: {
              data: context.type.value,
            },
          });
          break;
        case 'destroy_employe_many':
          dispatch({
            type: UserTypes.destroy_employe_many,
            payload: {
              data: context.type.value,
            },
          });
          context.stateActions({
            ...context.state,
            avatar: null,
            avatar_url: '',
            destroyArray: false,
            array: [],
            filter: [],
          });
          break;
        case 'update_employe':
          dispatch({
            type: UserTypes.update_employe,
            payload: {
              data: res.data.data,
              public: context.type.value,
            },
          });
          dispatch({
            type: DefaultTypes.drawer,
            payload: {
              drawer: {
                active: 0,
                page: 'user',
                child_page: 'list',
                parent_page: '',
                title: 'User list',
                breadcrumbs: ['Dashboard', 'User', 'List'],
                update: false,
                context: {},
                record: false,
              },
            },
          });
          break;
        case 'updated_accounts':
          dispatch({
            type: UserTypes.update_accounts,
            payload: {
              data: res.data.data,
            },
          });
          break;
        case 'add_employe':
          dispatch({
            type: UserTypes.add_employe,
            payload: {
              data: res.data.data,
            },
          });
          dispatch({
            type: DefaultTypes.drawer,
            payload: {
              drawer: {
                active: 0,
                page: 'user',
                child_page: 'list',
                parent_page: '',
                title: 'User list',
                breadcrumbs: ['Dashboard', 'User', 'List'],
                update: false,
                context: {},
                record: false,
              },
            },
          });
          break;
        default:
          break;
      }
    }
  }
}

export const allDispatch = new AllDispatch();
