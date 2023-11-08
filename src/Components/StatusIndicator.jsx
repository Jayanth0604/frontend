import React from 'react';

const StatusIndicator = ({ isLoggedIn }) => {
  const statusColor = isLoggedIn ? 'green' : 'red';

  return <div className="status-indicator" style={{ background: statusColor }} />;
};

export default StatusIndicator;
