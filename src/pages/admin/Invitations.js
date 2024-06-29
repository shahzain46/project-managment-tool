import React from 'react';

const InvitationsPage = () => (
  <div className="container text-align-center">
    <h1>Generate new invite</h1>
    <form>
      <input type="text" placeholder="Email"/>
      <button type="submit">Generate</button>
    </form>
  </div>
);

export default InvitationsPage;
