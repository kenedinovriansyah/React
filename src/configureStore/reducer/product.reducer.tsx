import { Reducer } from 'redux';
import { ProductType } from '../types/enum';
import { ProductState } from '../types/interface';

const initialState: ProductState = {
  product: {
    count: 0,
    results: [],
    next: '',
    previous: '',
  },
  category: {
    count: 0,
    results: [],
    next: '',
    previous: '',
  },
  dproduct: {},
  dcategory: {},
};

export const productReducer: Reducer<ProductState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProductType.list_category:
      return {
        ...state,
        category: action.payload.data,
      };
      break;
    case ProductType.destroy_category:
      state.category.results = state.category.results.filter(function (x) {
        return x.public_id !== action.payload.data;
      });
      return {
        ...state,
      };
      break;
    case ProductType.put_category:
      state.category.results = state.category.results.map((x) =>
        x.public_id === action.payload.data.public_id ? action.payload.data : x
      );
      return {
        ...state,
      };
      break;
    case ProductType.list_product:
      return {
        ...state,
        product: action.payload.data,
      };
      break;
    case ProductType.destroy_product:
      state.category.results = state.category.results.filter((x) => {
        if (x.public_id === action.payload.category) {
          x.product = x.product.filter(function (u) {
            return u.public_id !== action.payload.product;
          });
          return x;
        } else return x;
      });
      state.product.results = state.product.results.filter(function (x) {
        return x.public_id !== action.payload.product;
      });
      return {
        ...state,
      };
      break;
    case ProductType.put_product:
      state.category.results = state.category.results.filter((x) => {
        if (x.public_id === action.payload.category) {
          x.product = x.product.map((y) =>
            y.public_id === action.payload.data.public_id
              ? action.payload.data
              : y
          );
          return x;
        } else return x;
      });
      state.product.results = state.product.results.map((x) => {
        if (x.public_id === action.payload.data.public_id) {
          return action.payload.data;
        } else return x;
      });
      return {
        ...state,
      };
      break;
    case ProductType.pull_product:
      state.product.results = [
        ...state.product.results,
        ...action.payload.data.results,
      ];
      state.product.next = action.payload.data.next;
      state.product.previous = action.payload.data.previous;
      state.product.count = action.payload.data.count;
      return {
        ...state,
      };
      break;

    default:
      return state;
      break;
  }
};
