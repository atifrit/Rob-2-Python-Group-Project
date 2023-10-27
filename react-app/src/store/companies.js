const GET_COMPANYBYID = "companies/COMPANY_ID";
const GET_ALL_COMPANIES = '/companies';
const SEARCH_COMPANIES = 'companies/SEARCH_COMPANIES';

const setCompany = (company) => ({
  type: GET_COMPANYBYID,
  payload: company,
});

const getCompaniesActionCreator = (companies) => ({
  type: GET_ALL_COMPANIES,
  payload: companies
})

export const getAllCompanies = () => async (dispatch) => {
  try {
    const response = await fetch('/api/companies/');
    if(!response.ok) throw response;
    const data = await response.json();
    dispatch(getCompaniesActionCreator(data))
  } catch (error) {
    console.error('Error getting all companies: ', error)
  }
}

export const getCompanyById = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/companies/${id}`);
    if (!response.ok) throw response;
    const data = await response.json();
    dispatch(setCompany(data));
  } catch (error) {
    console.error("Error fetching company by ID:", error);
  }
};

export const searchCompanies = (query) => async (dispatch) => {
  try {
    const response = await fetch(`/api/search/companies?query=${query}`);
    if (!response.ok) throw response;
    const data = await response.json();

    dispatch({
      type: SEARCH_COMPANIES,
      payload: data,
    });
  } catch (error) {
    console.error('Error searching companies:', error);
  }
};

const initialState = {
  byId: {},
  currentCompany: null,
  searchResults: [],
};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANYBYID:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
        currentCompany: action.payload,
      };
    case GET_ALL_COMPANIES:
      let companies=[]
      for (let i = 0; i < action.payload.length; i++) {
        companies.push({[action.payload[i].id]: action.payload[i]})
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          ...companies
        }
      }
      case SEARCH_COMPANIES:
      return {
        ...state,
        searchResults: action.payload,
      };

    default:
      return state;
  }
};

export default companiesReducer;
