import React from 'react';
import HeaderBar from '../components/HeaderBar'


class MesDroits extends React.Component {
  render() {
    const { photos, actions } = this.props
    return (
      <div>
        <HeaderBar title="Mes droits" className="header-bar" />
        <div id="mes-droits-container">
          <h1 className="container-title">Mes droits</h1>
        </div>
      </div>
    );
  }
};

export default MesDroits
