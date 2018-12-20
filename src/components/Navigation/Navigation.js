import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
  if (isSignedIn) {
    return (
      <div>
        <nav
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="mt0 pt0"
        >
          <ProfileIcon
            onRouteChange={onRouteChange}
            toggleModal={toggleModal}
          />
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="mt0 pt0"
        >
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            {" "}
            SIGN IN{" "}
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f3 link dim black underline pa3 pointer"
          >
            {" "}
            REGISTER{" "}
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
