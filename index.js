/*
 * @Author: jiagy
 * @Description: harbor functions
 * @FilePath: /mydev/harborModel.js
 */
const harborReq = require('./harborClient');
const { harbor_version } = require('@pai/config/harbor.js');
const version_url = harbor_version === 'v1.0' ? '' : 'v2.0/';

// get all harbor projects 
const readAllProjects = async () => {
  const projectList = await harborReq._requestWithAuthToken(
    `/api/${version_url}projects`,
    'GET',
    {},
    {},
  );
  return projects;
};

// get all harbor user 
const readUsers = async () => {
  const userList = await harborReq._requestWithAuthToken(
    `/api/${version_url}users`,
    'GET',
    {},
    {},
  );
  return userList;
};

// get  repo
const readRepositories = async (projectId) => {
  let repositoryList;
  if (harbor_version === 'v1.0') {
    repositoryList = await harborReq._requestWithAuthToken(
      `/api/${version_url}repositories?project_id=${projectId}`,
      'GET',
      {},
      {},
    );
  } else {
    const project_info = await harborReq._requestWithAuthToken(
      `/api/${version_url}projects/${projectId}`,
      'GET',
      {},
      {},
    );

    repositoryList = await harborReq._requestWithAuthToken(
      `/api/${version_url}projects/${project_info.name}/repositories`,
      'GET',
      {},
      {},
    );

  }

  return repositoryList;
};

// get images list 
const readDetails = async (repoName) => {
  let detailList;
  if (harbor_version === 'v1.0') {
    detailList = await harborReq._requestWithAuthToken(
      `/api/${version_url}repositories/${repoName}/tags?detail=1`,
      'GET',
      {},
      {},
    );
  } else {
    // because of  harbor v2.0 added  artifacts 
    // there  is lots of differeces
    const arr = repoName.split('/');
    const project_name = arr[0];
    const image_name = arr.splice(arr.indexOf(0, 1));
    const data = await harborReq._requestWithAuthToken(
      `/api/${version_url}projects/${project_name}/repositories/${image_name.join(
        '/',
      )}/artifacts`,
      'GET',
      {},
      {},
    );
    detailList = data[0].tags;
  }

  return detailList;
};


module.exports = {
  readAllProjects,
  readUsers,
  readRepositories,
  readDetails,
};
