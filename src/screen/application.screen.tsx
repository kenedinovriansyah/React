import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allActions } from '../configureStore/actions/all.actions';
import _ from 'lodash';
import './static/application.scss';
import LeftCols from './application/left';
import { ApplicationState } from '../configureStore';
import { allDispatch } from '../configureStore/extensions/dispatch';
import { ColsRightContext, ColsRightContextApp } from '../context/cols.right';
import { User } from '../configureStore/types/interface';
import { Icons } from '../ref/icons';
import search from '../media/icons/magnifying-glass-search.svg';

const ApplicationScreen = () => {
  const selector = useSelector((state: ApplicationState) => state.default);
  const select = useSelector((state: ApplicationState) => state);
  const dispatch = useDispatch();
  const [state, setState] = React.useState();

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(
        allActions.all({
          url: '/api/v1/user/accounts/me/',
          status: 200,
          method: 'get',
          auth: true,
          json: true,
        })
      );
    }
    dispatch(
      allActions.all({
        url: '/api/v1/product/category/ext/all/',
        status: 200,
        method: 'get',
        auth: false,
        json: true,
      })
    );
    dispatch(
      allActions.all({
        url: '/api/v1/product/all/',
        status: 200,
        method: 'get',
        auth: false,
        json: true,
      })
    );
    return () => {
      mounted = false;
    };
  }, []);

  const change = (args: React.ChangeEvent<HTMLInputElement>) => {
    switch (selector.drawer.child_page) {
      case 'card':
        allDispatch.defaultDispatch(
          dispatch,
          args.currentTarget.value,
          'search-user'
        );
        break;

      default:
        break;
    }
  };

  const click = (name: string, type: string, args: User) => {
    switch (type) {
      case 'parent-page':
        allDispatch.defaultDispatch(
          dispatch,
          {
            active: 0,
            page: selector.drawer.page,
            child_page: selector.drawer.child_page,
            title: selector.drawer.title,
            breadcrumbs: selector.drawer.breadcrumbs,
            parent_page: name,
            update: true,
            context: args,
          },
          'drawer'
        );
        break;

      default:
        break;
    }
  };

  return (
    <ColsRightContext.Provider
      value={{
        open: selector.drawer,
        click,
      }}
    >
      <div>
        <div className="app-grid">
          <div className="app-cols">
            <LeftCols />
          </div>
          <div className="app-cols">
            <div className="app-navbar">
              <div className="field" id="field-input">
                <Icons src={search} className="icons" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="search"
                  placeholder="Search"
                  autoComplete="off"
                  onChange={change}
                  value={state}
                />
              </div>
              <div className="group">
                <div className="app-navbar-avatar">
                  <img
                    src={
                      select.user.data
                        ? select.user.data.accounts
                          ? select.user.data.accounts.avatar
                          : ''
                        : ''
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="app-right">
              <ColsRightContextApp />
            </div>
          </div>
        </div>
      </div>
    </ColsRightContext.Provider>
  );
};

export default ApplicationScreen;
