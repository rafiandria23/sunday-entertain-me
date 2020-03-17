import React from 'react';
import Helmet from 'react-helmet';

export default ({ title }) => {
  const defaultTitle = `Sunday Entertain ME`;

  return (
    <Helmet>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
    </Helmet>
  );
};
