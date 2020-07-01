import React from 'react';
import PropTypes from 'prop-types';
import { RepoItem } from './RepoItem.component';

const Repos = ({ repos }) => {
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />); // passing props
};

Repos.proTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
