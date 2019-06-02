import React from 'react';
import './Profile.css';

const Profile = (props) => {
  const { item, customTheme } = props;
  const {
    name,
    powerstats,
    biography,
    image,
  } = item;

  const {
    intelligence,
    strength,
    speed,
    durability,
    power,
    combat,
  } = powerstats;

  return (
    <div className={`Profile${customTheme ? ` Profile__${customTheme}` : ''}`}>
      <img className="Profile-image" src={image} alt={name} />
      <div className="Profile-stats">
        <p className="Profile-name">{name}</p>
        <p>Intelligence: {intelligence}</p>
        <p>Strength: {strength}</p>
        <p>Durability: {durability}</p>
        <p>Speed: {speed}</p>
        <p>Power: {power}</p>
        <p>Combat: {combat}</p>
      </div>
    </div>
  );
};

export default Profile;
