import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {useSelector} from "react-redux";

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {

  let {navStyle, themeType} = useSelector(({settings}) => settings);
  let {pathname} = useSelector(({common}) => common);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile/>
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            {/* <Menu.Item key="creators">
              <Link to="/creators"><i className="icon icon-user"/>
                <span><IntlMessages id="sidebar.tokenCreators"/></span>
              </Link>
            </Menu.Item> */}
            <Menu.Item key="projects">
              <Link to="/projects"><i className="icon icon-auth-screen"/>
                <span><IntlMessages id="sidebar.projects"/></span>
              </Link>
            </Menu.Item>
            <Menu.Item key="users">
              <Link to="/users"><i className="icon icon-avatar"/>
                <span><IntlMessages id="sidebar.swapUsers"/></span>
              </Link>
            </Menu.Item>
            <Menu.Item key="ads">
              <Link to="/ads"><i className="icon icon-user"/>
                <span><IntlMessages id="sidebar.ads"/></span>
              </Link>
            </Menu.Item>

          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;

