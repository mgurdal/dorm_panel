import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import UserList from '../../components/UserList';
import { fetchNodes, createNode, getModels } from '../../actions/nodeActions';

import { VictoryPie } from 'victory';
import GoogleMap from 'google-map-react';
import styled from 'styled-components';
import './styles.css'
const Container = styled.div`
  margin: 10%;
`
const Row = styled.div`
  display: flex;
  flex-flow: row;
  flex-direction: row;
  flex-wrap: wrap;
`
const Box = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column wrap;
  flex-direction: column;
  border: 3px solid darkcyan;
  margin: 1em;
  padding: 1em;
  min-width: 275px;

`

const CheckBox = styled.div`
  background: white;
  border: 2px solid darkcyan;
  padding: 0em;
  width: 1em;
  height: 1em;
  cursor: pointer;
`

const Button = styled.button`
  display: flex;
  flex: 1;
  flex-flow: column wrap;
  flex-direction: column;
  border: 3px solid darkcyan;
  margin: 1em;
  padding: 1em;
  background: none;
  outline: none;
  border-radius: 100px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px 1px darkcyan;
  }
  &:active {
    box-shadow: none;
  }
`

const Column = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0em .4em;
`

const UserMarker = ({ text }) => <svg height="100" width="100"> <circle cx="50" cy="50" r="20" stroke="black" strokeWidth={ 3 } fill="#16a085" /> </svg>

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModels: false,
      models: []
    }
    this.handleFetchNodes = this.handleFetchNodes.bind(this);

    this.handleCreateNode = this.handleCreateNode.bind(this);

  }

  componentWillMount() {
    this.handleFetchNodes()

  }

  handleFetchNodes() {
    this.props.dispatch(fetchNodes())
  }

  handleGetModels() {
    this.props.dispatch(getModels())
  }

  showModels(n){
    this.setState({ showModels: true, models: n['model_store'] })
  }


  handleCreateNode() {
    this.props.dispatch(createNode())
    if(!this.props.nodes.created){
      this.handleFetchNodes()
    }
  }

  render() {
    let nodes = this.props.nodes;

    return (
      <div className="nodes">
    <Container>
      <Row>
        <Column>

          <h1 style={{alignSelf: "flex-start", color: "darkcyan"}} > DORM Panel </h1>
          <h2 style={{color: "darkcyan"}}> Nodes </h2>
        </Column>
      </Row>
          <Row>
              <Column>
                <Column style={{ position: "fixed", bottom: 20, right: 20 }}>
                  {
                    nodes.creating ? <Button> Creating </Button> :
                    <Button onClick={ this.handleCreateNode} >Add Node</Button>
                  }
                  <Button>Add Model</Button>

                </Column>
              </Column>
          </Row>
          { this.props.nodes.error ? <h1> ERROR! </h1> : this.props.nodes.fetching ?
            <h2> Loading.. </h2> :
            <div>

          <Row>

              { nodes.data.slice(0, 4).map(n =>
                <Box
                  onClick={() => this.showModels(n)}>

                  <Row>
                  <Column>  { Object.keys(n).map(k => typeof(n[k]) === "object"  ? "":
                    <div>{k.trim()}</div>
                  )}</Column>
                  <Column>  { Object.keys(n).map(k => typeof(n[k]) === "object"  ? "":
                    <div>:{ JSON.stringify(n[k]).replace('"', "").replace('"', "") }</div>
                  )}</Column>
                  </Row>
                  <hr />
                  <Row> Models: { n['model_store'].length }</Row>

                  {/* {JSON.stringify(n)} */}
                </Box>

            )}
            </Row>
            <Row>

              { this.state.showModels ? <h2 style={{color: "darkcyan"}}> Models </h2> : "" }
            </Row>
            <Row>
              { this.state.showModels ? this.state.models.map(m => <Box>
                {/* <Row> <input type="checkbox"/> </Row> */}
                <Row > <h3 style={{ color: "darkcyan"}}>{m.table_name.charAt(0).toUpperCase() + m.table_name.slice(1)} </h3> </Row>
                <Row style={{ flexWrap: "nowrap"}}>

                  <Column style={{ flexGrow: 1}}> { m.columns.map(c => <div>{c.name}</div>)} </Column>
                  <Column style={{ flexGrow: 1}}> { m.columns.map(c => <b>:{c.type}</b>)} </Column>

                </Row>


              </Box>)
              :""}
        </Row>

      </div>
    }
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      nodes : state.nodes,
      posts: state.posts
    }
}

export default connect(
  mapStateToProps
)(Main)
