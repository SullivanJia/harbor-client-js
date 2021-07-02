/*
 * @Author: jiagy
 * @Date: 2020-09-22 14:02:09
 * @LastEditTime: 2021-07-02 11:02:08
 * @LastEditors: Please set LastEditors
 * @Description: 对harbor的client进行封装
 * @FilePath: /rest-server/src/models/harbor/harborClient.js
 */

const {
  baseURL,
  harbor_password,
  harbor_principal,
} = require('/config/harbor.js');
const axios = require('axios');
const https = require('https');

const _getConfig = (url, method, headers) => {
  const token = Buffer.from(`${harbor_principal}:${harbor_password}`).toString(
    'base64',
  );
  const config = {
    httpsAgent: new https.Agent({ rejectUnauthorized: false, keepAlive: true }),
    method: method,
    url: `${baseURL}${url}`,
    headers: {
      ...headers,
      Authorization: `Basic ${token}`,
    },
  };
  return config;
};

const _getResp = async (url, method, headers, data) => {
  const config = _getConfig(url, method, headers);
  config.data = data;
  const resp = axios(config);
  return resp;
};

const _requestWithAuthToken = async (url, method, headers, data) => {
  try {
    const resp = await _getResp(url, method, headers, data);
    return resp.data;
  } catch (error) {
    console.log(`harbor发送请求异常：${error}`)
  }
};

module.exports = {
  _requestWithAuthToken,
};
