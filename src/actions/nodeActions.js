// async request lib
import axios from 'axios';

export function fetchNodes() {
  return ( dispatch ) => {
    dispatch({ type: "FETCH_NODES_PENDING"})
    axios.get("http://0.0.0.0:1307/nodes")
    .then( response => {
      dispatch({ type: "FETCH_NODES_FULLFILLED", payload: response.data })
    }).catch( err => {
      dispatch({ type: "FETCH_NODES_REJECTED", payload: err })
    })
  }
}

export function createNode() {
  return ( dispatch ) => {
    dispatch({ type: "CREATE_NODE_PENDING"})
    axios.get("http://0.0.0.0:1307/create_node")
    .then( response => {
      dispatch({ type: "CREATE_NODE_FULLFILLED", payload: response.data })
    }).catch( err => {
      dispatch({ type: "CREATE_NODE_REJECTED", payload: err })
    })
  }
}

export function getModels(node_id) {
  return ( dispatch ) => {
    dispatch({ type: "GET_MODELS_PENDING"})
    axios.post("http://0.0.0.0:1307/models", { node_id: node_id })
    .then( response => {
      dispatch({ type: "GET_MODELS_FULLFILLED", payload: response.data })
    }).catch( err => {
      dispatch({ type: "GET_MODELS_REJECTED", payload: err })
    })
  }
}
