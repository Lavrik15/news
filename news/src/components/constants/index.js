export const DEAFULT_QUERY = 'react';
export const PATH_BASE = 'https://hn.algolia.com/api/v1';
export const PATH_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';
export const HITS_PER_PAGE = 'hitsPerPage=';
export const url = `${PATH_BASE}${PARAM_SEARCH}?${PARAM_SEARCH}${DEAFULT_QUERY}&${PARAM_PAGE}`;