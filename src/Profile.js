import React from 'react';
import Card from '@material-ui/core/Card';

const Profile = (props) => {
  const { item } = props;
  const {
    login,
    type,
    score,
    id,
    url,
  } = item;

  return (
    <Card>
      <p>Login: {login}</p>
      <p>Type: {type}</p>
      <p>Score: {score}</p>
      <p>ID: {id}</p>
      <p>URL: {url}</p>
    </Card>
  );
};

export default Profile;
