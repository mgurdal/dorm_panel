const nodes = ( state={
    fetching: false,
    fetched: false,
    error: null,
    fetching_models: false,
    fetched_models: false,
    creating: false,
    created: false,
    creation_err: null,
    data: [],
    selectedNodes: [],
    models: []
  }, action ) => {
  switch (action.type) {
    case "FETCH_NODES_PENDING":
      return {
        ...state,
        fetched: false,
        fetching: true
      }
    case "FETCH_NODES_FULLFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    case "FETCH_NODES_REJECTED":
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      }
    case "CREATE_NODE_PENDING":
      return {
        ...state,
        creating: true,
        created: false,
      }
    case "CREATE_NODE_FULLFILLED":
      return {
        ...state,
        creating: false,
        created: true,
      }
    case "CREATE_NODE_REJECTED":
      return {
        ...state,
        creating: false,
        created: false,
      }
    case "GET_MODELS_PENDING":
      return {
        ...state,
        creating_models: true,
        created_models: false,
      }
    case "GET_MODELS_FULLFILLED":
      return {
        ...state,
        creating_models: false,
        created_models: true,
        models: action.payload
      }
    case "GET_MODELS_REJECTED":
      return {
        ...state,
        creating_models: false,
        created_models: false,
      }
    default:
      return state;
  }
}

export default nodes;
