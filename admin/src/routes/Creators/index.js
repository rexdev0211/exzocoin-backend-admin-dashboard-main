import React, { useState, useEffect } from "react";
import { Table, Card, Input, Typography, Tooltip, Drawer, Row, Col, Divider, Badge, Button, Tag, Popconfirm} from "antd"

import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getUserList, changeVerification } from "appRedux/actions";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import IntlMessages from "util/IntlMessages";
import UserModal from "./UserModal";

const Search = Input.Search;
const { Text } = Typography;

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users.userList);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [selectedUser, selectUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID_User',
      render: (text, record) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <p className="gx-mb-0">{record.id}</p>
          </div>
        )
      },
    },
    {
      title: 'UserName',
      dataIndex: 'UserName',
      render: (text, record) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <p className="gx-mb-0">{record.username}</p>
          </div>
        )
      },
    },
    {
      title: 'FirstName',
      dataIndex: 'FirstName',
      render: (text, record) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <p className="gx-mb-0">{record.firstName}</p>
          </div>
        )
      },
    },
    {
      title: 'LastName',
      dataIndex: 'LastName',
      render: (text, record) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <p className="gx-mb-0">{record.lastName}</p>
          </div>
        )
      },
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      render: (text, record) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <p className="gx-mb-0">{record.email}</p>
          </div>
        )
      },
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      render: (text, record) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <p className="gx-mb-0">{record.phoneNumber}</p>
          </div>
        )
      },
    },
    {
      title: 'Verify Status',
      dataIndex: 'Verify',
      render: (text, record) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            {record.verified && (
              <Tag color="cyan">Verified</Tag>
            )}
            {!record.verified && (
              <Tag color="red">Not Verified</Tag>
            )}
          </div>
        )
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <Tooltip color="cyan" title="View user">
              <span
                className="gx-text-primary gx-pointer"
                onClick={(e) => onViewUserProfile(record)}
              >
                <i className="icon icon-view gx-fs-lg gx-mr-2" />
              </span>
            </Tooltip>
            <Tooltip color="purple" title="Edit user">
              <Link to={`/creator/${record.id}`}>
                <span className="gx-text-primary gx-pointer">
                  <i className="icon icon-edit gx-fs-lg gx-mr-2" />
                </span>
              </Link>
            </Tooltip>
            {!record.verified && (
            <Tooltip color="red" title="Verify">
              <Popconfirm placement="left" title="Are you sure to verify this user?" okText="Yes" cancelText="No"
                onConfirm={(e) => dispatch(changeVerification(record.id, record.type, true))}>
                <span className="gx-text-primary gx-pointer">
                  <i className="icon icon-link gx-fs-lg gx-mr-2" />
                </span>
              </Popconfirm>
            </Tooltip>
            )}
          </div>
        )
      },
    },
  ];

  useEffect(() => {
    dispatch(getUserList('creator', 0, 50));
  }, []);

  useEffect(() => {
    setFilteredData(users);
  }, [users]);

  useEffect(() => {
    if (!users || !users.length) return;
    // Search
    const searchResult = users.filter((record) => {
      const fullString =
        record.id + ' ' +
        record.username + ' ' +
        record.firstName + ' ' +
        record.lastName + ' ' +
        record.email
      if (
        fullString &&
        fullString.toLowerCase().search(searchText.toLowerCase()) != -1
      )
        return true;
      return false;
    })

    setFilteredData(searchResult);
  }, [searchText]);

  const onSearch = (searchText) => {
    setSearchText(searchText);
  };

  const onViewUserProfile = (record) => {
    selectUser(record);
    setShowUserProfile(true);
  }

  const onEditUser = (record) => {
    selectUser(record);
    setShowUserModal(true);
  }

  return (
    <>
      <h2 className="title gx-mb-4"><IntlMessages id="sidebar.tokenCreators" /></h2>

      <Card>
        <Search
          placeholder="Search..."
          onSearch={onSearch}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          style={{ width: 200, marginRight: 20 }}
        />
        <Table
          className="gx-table-no-bordered"
          columns={columns}
          rowKey={'id'}
          pagination={{ pageSize: 10 }}
          size="middle"
          dataSource={filteredData}
        />
      </Card>
      {showUserModal && (
        <UserModal
          user={selectedUser}
          open={showUserModal}
          onClose={(e) => setShowUserModal(false)}
        />
      )}
      {selectedUser && (
        <Drawer
          width={640}
          placement="left"
          closable={false}
          visible={showUserProfile}
          onClose={() => setShowUserProfile(false)}
        >
          <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
            <Text type="danger" level={2}>{selectedUser.username}</Text> 's Profile
        </p>
          <p className="site-description-item-profile-p">Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="First Name" content={selectedUser.firstName} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Last Name" content={selectedUser.lastName} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="Website" content={<Typography.Link href={selectedUser.website} target="_blank">{selectedUser.website}</Typography.Link>} />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Contacts</p>
          <Row>
            <Col span={12}>
              {!selectedUser.emailVerified && (
                <DescriptionItem title="Email" content={
                  <Badge count={<CloseCircleOutlined style={{ color: '#f5222d', right: -6 }} />}>
                    {selectedUser.email}
                  </Badge>
                } />
              )}
              {selectedUser.emailVerified && (
                <DescriptionItem title="Email" content={
                  <Badge count={<CheckCircleOutlined style={{ color: "green", right: -6 }} />}>
                    <Typography.Link href={`mailto:${selectedUser.email}`} target="_blank">{selectedUser.email}</Typography.Link>
                  </Badge>
                } />
              )}
            </Col>
            {selectedUser.phoneNumber && !selectedUser.emailVerified && (
              <Col span={12}>
                <Button type="primary" size="small">Manually Verify</Button>
              </Col>
            )}
          </Row>
          <Row>
            <Col span={12}>
              {selectedUser.phoneNumber && !selectedUser.phoneVerified && (
                <DescriptionItem title="Phone" content={
                  <Badge count={<CloseCircleOutlined style={{ color: '#f5222d', right: -7 }} />}>
                    {selectedUser.phoneNumber}
                  </Badge>
                } />
              )}
              {selectedUser.phoneVerified && (
                <DescriptionItem title="Phone" content={
                  <Badge count={<CheckCircleOutlined style={{ color: "green", right: -7 }} />}>
                    <Typography.Link href={`mailto:${selectedUser.phoneNumber}`} target="_blank">{selectedUser.phoneNumber}</Typography.Link>
                  </Badge>
                } />
              )}
            </Col>
            {selectedUser.phoneNumber && !selectedUser.phoneVerified && (
              <Col span={12}>
                <Button type="primary" size="small">Manually Verify</Button>
              </Col>
            )}
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Facebook"
                content={
                  <Typography.Link href={selectedUser.facebook} target="_blank">{selectedUser.facebook}</Typography.Link>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Instagram"
                content={
                  <Typography.Link href={selectedUser.instagram} target="_blank">{selectedUser.instagram}</Typography.Link>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Twitter"
                content={
                  <Typography.Link href={selectedUser.twitter} target="_blank">{selectedUser.twitter}</Typography.Link>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="LinkedIn"
                content={
                  <Typography.Link href={selectedUser.linkedin} target="_blank">{selectedUser.linkedin}</Typography.Link>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Telegram"
                content={
                  <Typography.Link href={selectedUser.telegram} target="_blank">{selectedUser.telegram}</Typography.Link>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Whitepaper"
                content={
                  <Typography.Link href={selectedUser.whitepaper} target="_blank">{selectedUser.whitepaper}</Typography.Link>
                }
              />
            </Col>
          </Row>
        </Drawer>
      )}
    </>
  );
};

export default Users;
