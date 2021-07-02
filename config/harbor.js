/*
 * @Author: jiagy
 * @LastEditors: Please set LastEditors
 * @Description: harbor configuration
 * @FilePath: ./config/harbor.js
 */

// modules
const yaml = require('js-yaml');
const { readFileSync } = require('fs');


const HARBOR_CONFIG = 'harbor.yaml';
const configContent = readFileSync(HARBOR_CONFIG, 'utf8');
const harborConfig = yaml.safeLoad(configContent);
// harbor http/https address
const baseURL = harborConfig.uri;
const harbor_principal = harborConfig.principal;
const harbor_password = harborConfig.password;
const harbor_version = harborConfig.version;

module.exports = {
  baseURL,
  harbor_principal,
  harbor_password,
  harbor_version,
};
