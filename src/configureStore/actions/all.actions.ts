import axios, { AxiosResponse, Method } from "axios";
import { Dispatch } from "redux";
import { allDispatch } from "../extensions/dispatch";
import { User } from "../types/interface";

export interface ActionsType {
  auth: boolean;
  json: boolean;
  dataForm?: FormData;
  data?: User;
  status: number;
  url: string;
  method: Method;
}

class AllActions {
  constructor() {}
  public header(context: boolean, method: Method, json: boolean) {
    let headers: any, methods: Method, type: string;
    if (json) {
      type = "application/json";
    } else {
      type = "multipart/form-data";
    }
    switch (method) {
      case "post":
        methods = "POST";
        break;
      case "delete":
        methods = "DELETE";
        break;
      case "put":
        methods = "PUT";
        break;
      default:
        break;
    }
    if (context) {
      headers = {
        "Access-Control-Allow-Methods": methods,
        "Access-Control-Allow-Headers":
          "Content-Type, Origin, Accepted, X-Requested-With",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": type,
      };
    } else {
      headers = {
        "Access-Control-Allow-Methods": methods,
        "Access-Control-Allow-Headers":
          "Content-Type, Origin, Accepted, X-Requested-With, Authorization",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": type,
      };
    }
    return headers;
  }

  non_message() {
    return ["/api-auth-token/"];
  }

  credentials() {
    return ["/api-token-auth/"];
  }

  public all(context: ActionsType) {
    return async (dispatch: Dispatch) => {
      return await axios({
        url: context.url,
        data: context.json ? context.data : context.dataForm,
        headers: this.header(context.auth, context.method, context.json),
        method: context.method,
        maxContentLength: 2000,
        maxRedirects: 5,
        responseType: "json",
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
          if (!this.non_message().includes(context.url)) {
            allDispatch.defaultDispatch(
              dispatch,
              {
                message: allDispatch.validatorSuccess(res.data),
                loading: false,
                color: 1,
                valid: 1,
              },
              "message"
            );
          }
          if (this.credentials().includes(context.url)) {
            localStorage.setItem("token", res.data.token);
            window.location.reload();
          }
        })
        .catch((err) => {
          allDispatch.defaultDispatch(
            dispatch,
            {
              message: allDispatch.validatorError(err.response.data),
              loading: false,
              color: 0,
              valid: 1,
            },
            "message"
          );
        });
    };
  }
}

export const allActions = new AllActions();
