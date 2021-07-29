import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../configureStore';
import { allActions } from '../../configureStore/actions/all.actions';
import { allDispatch } from '../../configureStore/extensions/dispatch';
import { UserFormColsLeft, UserFormColsRight } from './create/user.form';
import { ProductFormLeft, ProductFormRight } from './create/product.form';
import { formfield } from './utils/form.state';

interface ContextProps {
  name: string;
}

export interface FormState {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  gender: string;
  genderId: string;
  genderDropdown: boolean;
  type: string;
  typeId: string;
  typeDropdown: any;
  phone_number: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postal_code: string;
  avatar: any;
  avatar_url: string;
  description: string;
  name: string;
  arrayImage: any[];
  price: string;
  sales_price: string;
  category: string;
  genders: any[];
  sku: string;
  code: string;
}

const CreateForm: React.FC<ContextProps> = (
  props: React.PropsWithChildren<ContextProps>
) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: ApplicationState) => state);
  const defaults = useSelector((state: ApplicationState) => state.default);
  const [state, setState] = React.useState<FormState>(formfield.state());

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(
        allActions.all({
          url: '/api/v1/default/',
          method: 'get',
          status: 200,
          json: true,
          auth: false,
        })
      );
    }
    return () => {
      mounted = false;
    };
  }, []);
  React.useEffect(() => {
    if (defaults.reset) {
      formfield.clear(state, setState);
    }
  }, [defaults.reset]);

  React.useEffect(() => {
    if (selector.default.drawer.update) {
      formfield.updateUser(state, setState, selector, defaults);
    }
  }, [selector.default.drawer.update]);

  const change = (
    args: React.ChangeEvent<HTMLInputElement>,
    context: string
  ) => {
    formfield.input_field(args, context, state, setState, selector);
  };

  const changeTextarea = (
    args: React.ChangeEvent<HTMLTextAreaElement>,
    type: string
  ) => {
    formfield.textarea_field(args, type, state, setState);
  };

  const submit = (args: React.FormEvent<HTMLFormElement>) => {
    args.preventDefault();
    formfield.submit(state, selector, dispatch, defaults);
  };

  const clickSelect = (name: string, id: string, type: string) => {
    switch (type) {
      case 'gender':
        setState({
          ...state,
          gender: name,
          genderId: id,
          genderDropdown: !state.genderDropdown,
        });
        break;
      case 'type':
        setState({
          ...state,
          type: name,
          typeId: id,
          typeDropdown: !state.typeDropdown,
        });
        break;
      case 'gender':
        break;

      default:
        break;
    }
  };

  let right: any, left: any;

  switch (props.name) {
    case 'create':
      left = (
        <UserFormColsLeft
          state={state}
          setState={setState}
          selector={selector}
          defaults={defaults}
          change={change}
          submit={submit}
          clickSelect={clickSelect}
        />
      );
      right = (
        <UserFormColsRight
          state={state}
          setState={setState}
          selector={selector}
          defaults={defaults}
          change={change}
          submit={submit}
          clickSelect={clickSelect}
        />
      );
      break;
    case 'create-product':
      left = (
        <ProductFormLeft
          selector={selector}
          state={state}
          change={change}
          submit={submit}
          setState={setState}
          changeTextarea={changeTextarea}
        />
      );
      right = (
        <ProductFormRight
          selector={selector}
          state={state}
          change={change}
          submit={submit}
          setState={setState}
          changeTextarea={changeTextarea}
        />
      );
      break;

    default:
      break;
  }

  return selector.user.data ? (
    <div className="create-grid">
      <div className="create-cols">{left}</div>
      <div className="create-cols">{right}</div>
    </div>
  ) : null;
};

export default CreateForm;
