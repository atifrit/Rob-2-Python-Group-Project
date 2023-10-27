const GET_COMPANYBYID = "companies/COMPANY_ID";
const GET_ALL_COMPANIES = '/companies'
const FIND_STOCKS = 'companies/FIND_STOCKS'

const setCompany = (company) => ({
  type: GET_COMPANYBYID,
  payload: company,
});

const getCompaniesActionCreator = (companies) => ({
  type: GET_ALL_COMPANIES,
  payload: companies
})

const findStocks = (companies) => ({
  type: FIND_STOCKS,
  companies
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

export const fetchStockSearch = (name) => async (dispatch) => {
  const response = await fetch(`/api/companies/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name }),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
        return;
      }
      dispatch(findStocks(data));
    }
  };

const initialState = {
  byId: {},
  currentCompany: null,
  searchedStocks: {}
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
    default:
      return state;
    case FIND_STOCKS:{

      return { ...state, searchedStocks: action.companies }
    }
  }
};

export default companiesReducer;
