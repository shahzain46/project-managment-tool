import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfilePage from '../pages/Profile';
import Navigation from '../components/navigation/Navigation';

function ProfileLayout() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main className="main">
        <Switch>
          <Route path="/dashboard/profile" component={ProfilePage} />
        </Switch>
      </main>
    </div>
  );
}

export default ProfileLayout;
