import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../configureStore";
import { allActions } from "../../configureStore/actions/all.actions";
import down from "../../media/icons/chevron-arrow-down.svg";
import { Icons } from "../../ref/icons";
import info from "../../media/icons/info-1.svg";
import { allDispatch } from "../../configureStore/extensions/dispatch";

interface Picture {
  avatar: string;
  avatar_url: string;
}

interface ContextProps {
  state: Picture;
  setState: React.Dispatch<React.SetStateAction<Picture>>;
}

const CreateForm: React.FC<ContextProps> = (
  props: React.PropsWithChildren<ContextProps>
) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: ApplicationState) => state);
  const defaults = useSelector((state: ApplicationState) => state.default);
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    gender: "",
    genderId: "",
    genderDropdown: false,
    type: "",
    typeId: "",
    typeDropdown: false,
    phone_number: "",
    country: "",
    state: "",
    city: "",
    address: "",
    postal_code: "",
    avatar: null,
  });

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(
        allActions.all({
          url: "/api/v1/default/",
          method: "get",
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
      setState({
        ...state,
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        gender: "",
        genderId: "",
        genderDropdown: false,
        type: "",
        typeId: "",
        typeDropdown: false,
        phone_number: "",
        country: "",
        state: "",
        city: "",
        address: "",
        postal_code: "",
        avatar: null,
      });
    }
    props.setState({
      ...props.state,
      avatar: "",
      avatar_url: "",
    });
  }, [defaults.reset]);

  React.useEffect(() => {
    if (selector.default.drawer.update) {
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
        postal_code:
          selector.default.drawer.context.accounts.address.postal_code,
        avatar: null,
      });
    }
  }, [selector.default.drawer.update]);
  const change = (
    args: React.ChangeEvent<HTMLInputElement>,
    context: string
  ) => {
    switch (context) {
      case "first_name":
        setState({
          ...state,
          first_name: args.currentTarget.value,
        });
        break;
      case "last_name":
        setState({
          ...state,
          last_name: args.currentTarget.value,
        });
        break;
      case "gender":
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
          genderId: gender ? gender.id : "0",
        });
        break;
      case "type":
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
          typeId: type ? type.id : "0",
        });
        break;
      case "phone_number":
        setState({
          ...state,
          phone_number: args.currentTarget.value,
        });
        break;
      case "username":
        setState({
          ...state,
          username: args.currentTarget.value,
        });
        break;
      case "email":
        setState({
          ...state,
          email: args.currentTarget.value,
        });
        break;
      case "country":
        setState({
          ...state,
          country: args.currentTarget.value,
        });
        break;
      case "state":
        setState({
          ...state,
          state: args.currentTarget.value,
        });
        break;
      case "city":
        setState({
          ...state,
          city: args.currentTarget.value,
        });
        break;
      case "address":
        setState({
          ...state,
          address: args.currentTarget.value,
        });
        break;
      case "postal_code":
        setState({
          ...state,
          postal_code: args.currentTarget.value,
        });
        break;
      default:
        break;
    }
  };

  const submit = (args: React.FormEvent<HTMLFormElement>) => {
    args.preventDefault();
    const data = new FormData();
    data.append("username", state.username);
    data.append("email", state.email);
    data.append("first_name", state.first_name);
    data.append("last_name", state.last_name);
    data.append("gender", state.genderId);
    data.append("type", state.typeId);
    data.append("phone", state.phone_number);
    data.append("country", state.country);
    data.append("state", state.state);
    data.append("city", state.city);
    data.append("address", state.address);
    data.append("postal_code", state.postal_code);
    if (props.state.avatar) {
      data.append("avatar", props.state.avatar);
    }
    data.append("types", "employe");
    allDispatch.defaultDispatch(
      dispatch,
      {
        message: "",
        valid: 0,
        color: 0,
        loading: true,
      },
      "message"
    );
    dispatch(
      allActions.all({
        url: defaults.drawer.update
          ? `/api/v1/user/updated/accounts/employe/${defaults.drawer.context.accounts.public_id}/`
          : "/api/v1/user/updated/accounts/",
        dataForm: data,
        status: 200,
        json: false,
        auth: true,
        method: "post",
        type: {
          name: "update_employe",
          value: defaults.drawer.context.accounts.public_id,
        },
      })
    );
  };

  const clickSelect = (name: string, id: string, type: string) => {
    switch (type) {
      case "gender":
        setState({
          ...state,
          gender: name,
          genderId: id,
          genderDropdown: !state.genderDropdown,
        });
        break;
      case "type":
        setState({
          ...state,
          type: name,
          typeId: id,
          typeDropdown: !state.typeDropdown,
        });
        break;
      case "gender":
        break;

      default:
        break;
    }
  };

  return selector.user.data ? (
    <div>
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
              onChange={(args) => change(args, "username")}
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
              onChange={(args) => change(args, "email")}
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
              onChange={(args) => change(args, "first_name")}
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
              onChange={(args) => change(args, "last_name")}
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
                onChange={(args) => change(args, "gender")}
                required
              />
              <div className="box">
                <Icons src={down} className="icons" />
              </div>
            </div>
            <div className={state.genderDropdown ? "dropdown" : "hidden"}>
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
                        "gender"
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
                onChange={(args) => change(args, "type")}
                required
              />
              <div className="box">
                <Icons src={down} className="icons" />
              </div>
            </div>
            <div className={state.typeDropdown ? "dropdown" : "hidden"}>
              <div className="dropdown-list">
                {_.map(selector.default.default.employe, (base, index) => {
                  return (
                    <a
                      href="#"
                      key={index}
                      onClick={clickSelect.bind(
                        base,
                        base.name,
                        base.id,
                        "type"
                      )}
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
              onChange={(args) => change(args, "phone_number")}
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
              onChange={(args) => change(args, "country")}
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
              onChange={(args) => change(args, "state")}
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
              onChange={(args) => change(args, "city")}
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
              onChange={(args) => change(args, "address")}
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
              onChange={(args) => change(args, "postal_code")}
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
            type={selector.default.message.loading ? "button" : "submit"}
            id={selector.default.message.loading ? "loading" : ""}
          >
            <span>Save Changes</span>
            {selector.default.message.loading ? (
              <div className="spin"></div>
            ) : null}
          </button>
        </div>
      </form>
    </div>
  ) : null;
};

export default CreateForm;
