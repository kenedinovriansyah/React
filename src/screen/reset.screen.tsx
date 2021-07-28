import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ApplicationState } from '../configureStore';
import { allActions } from '../configureStore/actions/all.actions';
import { allDispatch } from '../configureStore/extensions/dispatch';

const ResetScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state: ApplicationState) => state.default);
  const [state, setState] = React.useState({ token: '' });
  const onChange = (args: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      token: args.currentTarget.value,
    });
  };
  const onsubmit = (args: React.FormEvent<HTMLFormElement>) => {
    args.preventDefault();
    const data = {
      token: state.token,
      type: 'reset',
    };
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
    dispatch(
      allActions.all({
        url: '/api/v1/user/',
        data: data,
        method: 'post',
        status: 200,
        auth: false,
        json: true,
      })
    );
  };

  React.useEffect(() => {
    if (selector.reset) {
      state.token = '';
      history.push('/access-login');
      allDispatch.defaultDispatch(dispatch, false, 'reset');
    }
  }, [selector.reset]);

  return (
    <div className="auth">
      <form onSubmit={onsubmit}>
        <div className="field" id="field-title">
          <h4>Reset your password</h4>
          <p>
            Enter your user account's verified email address and we will send
            you a password reset link.
          </p>
        </div>
        <div className="field" id="field-vertical">
          <label htmlFor="">Find username or email address</label>
          <div id="field-input">
            <input
              type="text"
              name="token"
              id="token"
              className="token"
              placeholder="Find username or email address"
              autoComplete="off"
              readOnly={selector.message.loading}
              value={state.token}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="field" id="field-button">
          <button
            type={selector.message.loading ? 'button' : 'submit'}
            id={selector.message.loading ? 'loading' : ''}
          >
            <span>Reset</span>
            {selector.message.loading ? <div className="spin"></div> : null}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetScreen;
