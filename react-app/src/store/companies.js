const GET_COMPANYBYID = "companies/COMPANY_ID";

const setCompany = (company) => ({
  type: GET_COMPANYBYID,
  payload: company,
});

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

const initialState = {
  byId: {},
  currentCompany: null,
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
    default:
      return state;
  }
};

export default companiesReducer;
