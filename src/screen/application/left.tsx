import React from "react";
import { Icons } from "../../ref/icons";
import user from "../../media/icons/user.svg";
import email from "../../media/icons/email (1).svg";
import anaytics from "../../media/icons/analytics.svg";
import chat from "../../media/icons/chat.svg";
import schedule from "../../media/icons/schedule.svg";
import shop from "../../media/icons/shop.svg";
import monitor from "../../media/icons/imac.svg";
import app from "../../media/icons/app.svg";
import right from "../../media/icons/right-chevron.svg";
import down from "../../media/icons/chevron-arrow-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../configureStore";
import { allDispatch } from "../../configureStore/extensions/dispatch";

const LeftCols = () => {
  const selector = useSelector((state: ApplicationState) => state.default);
  const dispatch = useDispatch();
  const click = (name: string, type: string, title: string, link: any[]) => {
    switch (type) {
      case "page-with-child":
        allDispatch.defaultDispatch(
          dispatch,
          {
            active: 0,
            page: selector.drawer.page === name ? "" : name,
            title: title,
            breadcrumbs: link,
          },
          "drawer"
        );
        break;
      case "child-page":
        allDispatch.defaultDispatch(
          dispatch,
          {
            active: 0,
            page: selector.drawer.page,
            title: title,
            breadcrumbs: link,
            child_page: name,
          },
          "drawer"
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="logo">
        <img
          src="data:image/png;base64,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"
          alt=""
        />
      </div>
      <div className="app-list">
        <div className="app-list-title">
          <div className="title">General</div>
        </div>
        <a href="" className={selector.drawer.page === "app" ? "active" : ""}>
          <div className="group">
            <Icons src={app} className="icons" />
            <span>App</span>
          </div>
        </a>
        <a
          href=""
          className={selector.drawer.page === "e-commerce" ? "active" : ""}
        >
          <div className="group">
            <Icons src={shop} className="icons" />
            <span>E-commerce</span>
          </div>
        </a>
        <a
          href=""
          className={selector.drawer.page === "analytics" ? "active" : ""}
        >
          <div className="group">
            <Icons src={anaytics} className="icons" />
            <span>Analytics</span>
          </div>
        </a>
        <div className="app-list-title">
          <div className="title">management</div>
        </div>
        <div className="app-sub-list">
          <a
            onClick={click.bind("", "user", "page-with-child")}
            className={selector.drawer.page === "user" ? "active" : ""}
          >
            <div className="group">
              <Icons src={user} className="icons" />
              <span>User</span>
            </div>
            <Icons
              src={selector.drawer.page === "user" ? down : right}
              className="icons"
              id="right"
            />
          </a>
          <a
            className={
              selector.drawer.page === "user" ? "a-active" : "a-unactive"
            }
            href=""
          >
            Profile
          </a>
          <a
            className={
              selector.drawer.page === "user" ? "a-active" : "a-unactive"
            }
            href=""
          >
            List
          </a>
          <a
            className={
              selector.drawer.page === "user" ? "a-active" : "a-unactive"
            }
            href="#"
            onClick={click.bind(
              "",
              "create",
              "child-page",
              "Create a new user",
              ["Dashboard", "User", "New User"]
            )}
          >
            Create
          </a>
          <a
            className={
              selector.drawer.page === "user" ? "a-active" : "a-unactive"
            }
            href=""
          >
            Edit
          </a>
          <a
            className={
              selector.drawer.page === "user" ? "a-active" : "a-unactive"
            }
            href="#"
            onClick={click.bind("", "accounts", "child-page", "Account", [
              "Dashboard",
              "User",
              "Accounts Settings",
            ])}
          >
            Accounts
          </a>
          <a
            onClick={click.bind("", "m-ecommerce", "page-with-child")}
            className={selector.drawer.page === "m-ecommerce" ? "active" : ""}
          >
            <div className="group">
              <Icons src={shop} className="icons" />
              <span>E-commerce</span>
            </div>
            <Icons
              src={selector.drawer.page === "m-ecommerce" ? down : right}
              className="icons"
              id="right"
            />
          </a>
          <a
            className={
              selector.drawer.page === "m-ecommerce" ? "a-active" : "a-unactive"
            }
            href=""
          >
            Shop
          </a>
          <a
            className={
              selector.drawer.page === "m-ecommerce" ? "a-active" : "a-unactive"
            }
            href=""
          >
            Product
          </a>
          <a
            className={
              selector.drawer.page === "m-ecommerce" ? "a-active" : "a-unactive"
            }
            href=""
          >
            List
          </a>
          <a
            className={
              selector.drawer.page === "m-ecommerce" ? "a-active" : "a-unactive"
            }
            href=""
          >
            Create
          </a>
          <a
            className={
              selector.drawer.page === "m-ecommerce" ? "a-active" : "a-unactive"
            }
            href=""
          >
            Checkout
          </a>
          <a
            className={
              selector.drawer.page === "m-ecommerce" ? "a-active" : "a-unactive"
            }
            href=""
          >
            Invoice
          </a>
        </div>
        <div className="app-list-title">
          <div className="title">app</div>
        </div>
        <a href="" className={selector.drawer.page === "mail" ? "active" : ""}>
          <div className="group">
            <Icons src={email} className="icons" />
            <span>Mail</span>
          </div>
        </a>
        <a href="" className={selector.drawer.page === "chat" ? "active" : ""}>
          <div className="group">
            <Icons src={chat} className="icons" />
            <span>Chat</span>
          </div>
        </a>
        <a
          href=""
          className={selector.drawer.page === "calendar" ? "active" : ""}
        >
          <div className="group">
            <Icons src={schedule} className="icons" />
            <span>Calendar</span>
          </div>
        </a>
        <a
          href=""
          className={selector.drawer.page === "kanban" ? "active" : ""}
        >
          <div className="group">
            <Icons src={monitor} className="icons" />
            <span>Kanban</span>
          </div>
        </a>
      </div>
    </>
  );
};

export default LeftCols;
