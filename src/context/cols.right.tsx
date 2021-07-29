import React from 'react';
import { Drawer, User } from '../configureStore/types/interface';
import _, { defaults } from 'lodash';
import { AccountsContext, AccountsContextApp } from './accounts.context';
import { Icons } from '../ref/icons';
import CreateForm from './applicationForm/create.form';
import sort from '../media/icons/sort.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../configureStore';
import trash from '../media/icons/searching.svg';
import edit from '../media/icons/edit.svg';
import trashs from '../media/icons/trash.svg';
import search from '../media/icons/magnifying-glass-search.svg';
import { allActions } from '../configureStore/actions/all.actions';
import { allDispatch } from '../configureStore/extensions/dispatch';
import ShapeAvatar from '../media/icons/shape-avatar.svg';
import InfiniteScroll from 'react-infinite-scroll-component';

interface ContextProps {
  open: Drawer;
  click(name: string, type: string, args: User): void;
}

export interface ColsRightStateActions {
  destroyArray: boolean;
  array: any[];
  filter: any[];
  dropdown: boolean;
  refresh: boolean;
}

export const ColsRightContext = React.createContext<Partial<ContextProps>>({});
export const ColsRightContextApp = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<ColsRightStateActions>({
    destroyArray: false,
    array: [],
    filter: [],
    dropdown: false,
    refresh: false,
  });

  const selector = useSelector((state: ApplicationState) => state.user);
  const select = useSelector((state: ApplicationState) => state.product);

  const handleClick = (type: string) => {
    switch (type) {
      case 'all':
        setState({
          ...state,
          destroyArray: !state.destroyArray,
          array: !state.destroyArray ? selector.data.accounts.employe : [],
        });
        break;

      default:
        break;
    }
  };

  const changePage = (args: User, type: string) => {
    switch (type) {
      case 'updated':
        allDispatch.defaultDispatch(
          dispatch,
          {
            active: 0,
            page: 'user',
            child_page: 'create',
            title: 'Edit User',
            breadcrumbs: ['Dashboard', 'User', 'Edit User'],
            update: true,
            context: args,
          },
          'drawer'
        );
        break;
      case 'create':
        allDispatch.defaultDispatch(
          dispatch,
          {
            active: '',
            page: 'user',
            child_page: 'create',
            title: 'Create a User',
            breadcrumbs: ['Dashboard', 'User', 'New User'],
            update: false,
            context: null,
            record: true,
          },
          'drawer'
        );
        break;
      default:
        break;
    }
  };

  const clickAddOrRemove = (args: User) => {
    const filter = state.array.filter(
      (x) => x.first_name.indexOf(args.first_name) > -1
    )[0];
    let array: any[];
    if (filter) {
      array = state.array.filter(function (x: User) {
        return x.id !== filter.id;
      });
    }
    setState({
      ...state,
      array: filter ? array : [...state.array, args],
    });
  };

  const changeFilter = (args: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      filter: [],
    });
    if (args.currentTarget.value.length >= 1) {
      setState({
        ...state,
        filter: selector.data.accounts.employe.filter(
          (x) =>
            x.first_name
              .toLowerCase()
              .indexOf(args.currentTarget.value.toLowerCase()) > -1
        ),
      });
    }
  };

  const clickSort = (type: string) => {
    allDispatch.defaultDispatch(dispatch, type, 'sort');
    setState({
      ...state,
      dropdown: !state.dropdown,
    });
  };

  const clickDropdown = (args: React.MouseEvent<SVGElement>) => {
    args.preventDefault();
    setState({
      ...state,
      dropdown: !state.dropdown,
    });
  };

  const clickDestroy = (context: any, type: string) => {
    switch (type) {
      case 'accounts':
        dispatch(
          allActions.all({
            url: `/api/v1/user/${context}`,
            status: 200,
            method: 'delete',
            json: true,
            auth: true,
            type: {
              value: context,
              name: 'destroy_employe',
            },
          })
        );
        break;
      case 'product':
        dispatch(
          allActions.all({
            url: `/api/v1/product/product/${context.public_id}`,
            method: 'delete',
            status: 200,
            json: true,
            auth: true,
            type: {
              value: context.category.public_id,
              name: 'destroy_product',
              child_value: context.public_id,
            },
          })
        );
        break;
      default:
        break;
    }
  };

  const clickDestroyManyToMany = (args: React.MouseEvent<HTMLSpanElement>) => {
    args.preventDefault();
    const data = [];
    for (let i = 0; i < state.array.length; i++) {
      data.push(state.array[i].id);
    }
    dispatch(
      allActions.all({
        url: `/api/v1/user/acounts/destroy/employe/${data}`,
        status: 200,
        method: 'delete',
        json: true,
        auth: true,
        type: {
          value: state.array,
          name: 'destroy_employe_many',
        },
        state,
        stateActions: setState,
      })
    );
  };

  function fetchData() {
    if (select.product.next) {
      dispatch(
        allActions.all({
          url: select.product.next,
          status: 200,
          method: 'get',
          json: true,
          auth: true,
        })
      );
    }
  }

  function refresh() {
    console.log('refresh');
  }
  return (
    <ColsRightContext.Consumer>
      {({ open, click }) => {
        switch (open.child_page) {
          case 'accounts':
            return (
              <>
                <AccountsContext.Provider
                  value={{
                    open: open.parent_page,
                  }}
                >
                  <div className="headers">
                    <div className="title">
                      <h5>{open.title}</h5>
                    </div>
                    <ul className="location">
                      {_.map(open.breadcrumbs, (base, index) => {
                        return (
                          <li key={index}>
                            <a>
                              <span>{base}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <ul className="app-tabs">
                    <li>
                      <a
                        href="#"
                        onClick={click.bind(
                          '',
                          'general',
                          'parent-page',
                          selector.data
                        )}
                      >
                        General
                      </a>
                    </li>
                    <li>
                      <a href="">Billing</a>
                    </li>
                    <li>
                      <a href="">Notifications</a>
                    </li>
                    <li>
                      <a href="">Social Links</a>
                    </li>
                    <li
                      className={open.parent_page === 'email' ? 'active' : ''}
                    >
                      <a
                        href="#"
                        onClick={click.bind('', 'email', 'parent-page')}
                      >
                        Email Password
                      </a>
                    </li>
                    <li
                      className={
                        open.parent_page === 'password' ? 'active' : ''
                      }
                    >
                      <a
                        href="#"
                        onClick={click.bind('', 'password', 'parent-page')}
                      >
                        Change Password
                      </a>
                    </li>
                  </ul>
                  <AccountsContextApp />
                </AccountsContext.Provider>
              </>
            );
            break;
          case 'create':
            return (
              <div>
                <div className="headers">
                  <div className="title">
                    <h5>{open.title}</h5>
                  </div>
                  <ul className="location">
                    {_.map(open.breadcrumbs, (base, index) => {
                      return (
                        <li key={index}>
                          <a>
                            <span>{base}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <CreateForm name={open.child_page} />
              </div>
            );
            break;
          case 'list':
            return (
              <div className="app-list">
                <div className="headers">
                  <div className="title">
                    <h5>{open.title}</h5>
                  </div>
                  <div className="group">
                    <ul className="location">
                      {_.map(open.breadcrumbs, (base, index) => {
                        return (
                          <li key={index}>
                            <a>
                              <span>{base}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                    <button onClick={changePage.bind('', '', 'create')}>
                      <span>New User</span>
                    </button>
                  </div>
                </div>
                <div className="app-table">
                  <div
                    className={
                      state.array.length >= 1 ? 'app-table-destroy' : 'hidden'
                    }
                  >
                    <span>{state.array.length} Selected</span>
                    <span onClick={clickDestroyManyToMany}>
                      <Icons src={trashs} className="icons" />
                    </span>
                  </div>
                  <div className="groups">
                    <div className="field" id="field-input">
                      <Icons src={search} className="icons" />
                      <input
                        type="text"
                        name="search"
                        id="search"
                        className="search"
                        placeholder="Search User"
                        autoComplete="off"
                        onChange={changeFilter}
                      />
                    </div>
                    <div className="filter-list">
                      <Icons
                        src={sort}
                        className="icons"
                        onClick={clickDropdown}
                      />
                      <div
                        className={
                          state.dropdown ? 'filter-dropdown' : 'hidden'
                        }
                      >
                        <a href="#" onClick={clickSort.bind('', 'A-z')}>
                          a-Z
                        </a>
                        <a href="#" onClick={clickSort.bind('', 'Z-a')}>
                          Z-a
                        </a>
                        <a href="#" onClick={clickSort.bind('', 'Member')}>
                          Member
                        </a>
                        <a href="#" onClick={clickSort.bind('', 'Employe')}>
                          Staff
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className="table-title">
                    <li id="choice">
                      <div
                        className="box"
                        id={state.destroyArray ? 'active' : ''}
                        onClick={handleClick.bind('', 'all')}
                      >
                        {state.destroyArray ? (
                          <i className="fas fa-check"></i>
                        ) : null}
                      </div>
                    </li>
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li id="gender">Gender</li>
                    <li id="phone">Phone Numbers</li>
                    <li id="type">Type</li>
                    <li id="options">Options</li>
                  </ul>
                  <div className="table-app">
                    {_.map(
                      state.filter.length >= 1
                        ? state.filter
                        : selector.data
                        ? selector.data.accounts
                          ? selector.data.accounts.employe
                          : []
                        : [],
                      (base, index) => {
                        return (
                          <ul key={index}>
                            <li id="choice">
                              <div
                                className="box"
                                id={
                                  state.array.filter(
                                    (x: User) =>
                                      x.first_name.indexOf(base.first_name) > -1
                                  )[0]
                                    ? 'active'
                                    : ''
                                }
                                onClick={clickAddOrRemove.bind(base, base)}
                              >
                                {state.array.filter(
                                  (x: User) =>
                                    x.first_name.indexOf(base.first_name) > -1
                                )[0] ? (
                                  <i className="fas fa-check"></i>
                                ) : null}
                              </div>
                            </li>
                            <li className="name">
                              {base.first_name.substr(0, 20)}
                              {base.first_name.length >= 20 ? ' ...' : ''}
                            </li>
                            <li className="name">
                              {base.last_name.substr(0, 20)}
                              {base.last_name.length >= 20 ? ' ...' : ''}
                            </li>
                            <li id="gender">
                              {base.accounts ? base.accounts.name_gender : ''}
                            </li>
                            <li id="phone">
                              {base.accounts
                                ? base.accounts.phone.phone_numbers
                                : ''}
                            </li>
                            <li id="type">
                              {base.accounts ? base.accounts.type.name : ''}
                            </li>
                            <li id="options">
                              <div className="group">
                                <button
                                  className="box"
                                  onClick={changePage.bind(
                                    base,
                                    base,
                                    'updated'
                                  )}
                                >
                                  <Icons src={edit} className="icons" />
                                </button>
                                <button
                                  className="box"
                                  onClick={clickDestroy.bind(
                                    base,
                                    base.accounts.public_id,
                                    'accounts'
                                  )}
                                >
                                  <Icons src={trash} className="icons" />
                                </button>
                              </div>
                            </li>
                          </ul>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            );
            break;
          case 'card':
            return (
              <div>
                <div className="headers">
                  <div className="title">
                    <h5>{open.title}</h5>
                  </div>
                  <div className="group">
                    <ul className="location">
                      {_.map(open.breadcrumbs, (base, index) => {
                        return (
                          <li key={index}>
                            <a>
                              <span>{base}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="lists-card">
                  {_.map(
                    selector.soft.length >= 1
                      ? selector.soft
                      : selector.data
                      ? selector.data.accounts
                        ? selector.data.accounts.employe
                        : []
                      : [],
                    (items, index) => {
                      return (
                        <div className="card" key={index}>
                          <div className="card-image">
                            <img
                              src="https://img.jakpost.net/c/2018/11/01/2018_11_01_57705_1541067002._large.jpg"
                              alt=""
                            />
                          </div>
                          <div className="card-header">
                            <div className="card-image-avatar">
                              <img src={items.accounts.avatar} alt="" />
                              <Icons src={ShapeAvatar} className="bg-trans" />
                            </div>
                            <div className="block"></div>
                            <div className="group">
                              <span>{items.first_name}</span>
                              <span>{items.last_name}</span>
                            </div>
                            <div className="status">
                              <span>{items.accounts.type.name}</span>
                            </div>
                          </div>
                          <div className="card-body">
                            <span className="phone">
                              {items.accounts.phone.phone_numbers}
                            </span>
                            <div className="group">
                              <span>{items.accounts.address.country}</span>
                              <span>{items.accounts.address.state}</span>
                              <span>{items.accounts.address.city}</span>
                              <span>{items.accounts.address.address}</span>
                              <span>{items.accounts.address.postal_code}</span>
                            </div>
                            <div className="groups">
                              <button
                                onClick={changePage.bind(
                                  items,
                                  items,
                                  'updated'
                                )}
                              >
                                <Icons className="icons" src={edit} />
                              </button>
                              <button
                                onClick={clickDestroy.bind(
                                  items,
                                  items.accounts.public_id,
                                  'accounts'
                                )}
                              >
                                <Icons className="icons" src={trash} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
            break;
          case 'shop':
            return (
              <div>
                <div className="headers">
                  <div className="title">
                    <h5>{open.title}</h5>
                  </div>
                  <div className="group">
                    <ul className="location">
                      {_.map(open.breadcrumbs, (base, index) => {
                        return (
                          <li key={index}>
                            <a>
                              <span>{base}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <InfiniteScroll
                  dataLength={
                    select.product.soft
                      ? select.product.soft.length
                      : select.product.results.length
                  }
                  next={select.product.soft ? null : fetchData}
                  hasMore={
                    select.product.next
                      ? select.product.soft
                        ? false
                        : true
                      : false
                  }
                  loader={
                    <div className="loading-product">
                      <div className="cp-spinner cp-boxes"></div>{' '}
                    </div>
                  }
                  refreshFunction={refresh}
                  pullDownToRefreshThreshold={8}
                  pullDownToRefreshContent={<div>Pull Refresh</div>}
                  className="lists"
                >
                  {_.map(
                    select.product.soft
                      ? select.product.soft
                      : select.product.results,
                    (base, index) => {
                      return (
                        <div className="card-product" key={index}>
                          <div className="card-product-image">
                            <img
                              src="https://www.tradeys.com.au/wp-content/uploads/2019/05/sb312158.png"
                              alt=""
                            />
                            <div className="group-absolute">
                              <button>
                                <Icons src={edit} className="icons" />
                              </button>
                              <button
                                onClick={clickDestroy.bind(
                                  base,
                                  base,
                                  'product'
                                )}
                              >
                                <Icons src={trash} className="icons" />
                              </button>
                            </div>
                          </div>
                          <div className="card-product-body">
                            <div className="card-product-author">
                              <div className="card-product-avatar">
                                <img src={base.author.avatar} alt="" />
                              </div>
                              <span>{base.author.user.first_name}</span>
                            </div>
                            <h2 className="name">{base.name}</h2>
                            <div className="group">
                              <div className="group-color">
                                {_.map(
                                  base.galery.slice(0, 2),
                                  (base_h, index_h) => (
                                    <div className="border-color" key={index_h}>
                                      <div
                                        className="child-border-color"
                                        style={{
                                          backgroundColor: base_h.hex,
                                        }}
                                      ></div>
                                    </div>
                                  )
                                )}
                                {base.galery.length >= 3 ? (
                                  <span>+5</span>
                                ) : null}
                              </div>
                              <span className="price">
                                {base.currency.price_currency}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </InfiniteScroll>
                <div className="paginations"></div>
              </div>
            );
            break;
          case 'create-product':
            return (
              <div>
                <div className="headers">
                  <div className="title">
                    <h5>{open.title}</h5>
                  </div>
                  <div className="group">
                    <ul className="location">
                      {_.map(open.breadcrumbs, (base, index) => {
                        return (
                          <li key={index}>
                            <a>
                              <span>{base}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <CreateForm name={open.child_page} />
              </div>
            );
            break;
          default:
            break;
        }
      }}
    </ColsRightContext.Consumer>
  );
};
