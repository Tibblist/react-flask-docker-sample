import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";

const App = (props) => {
  const [listItems, setListItems] = useState(["test"]);

  useEffect(() => {
    //Fetch list items
    axios.get("/items/list").then((resp) => {
      setListItems(resp.data);
    });
  }, []);

  const createNewItem = () => {
    let newList = Array.from(listItems);
    newList.push("");
    setListItems(newList);
  };

  const changeItem = (idx, event) => {
    let newList = Array.from(listItems);
    newList[idx] = event.target.value;
    setListItems(newList);
  };

  const deleteItem = (idx) => {
    let newList = Array.from(listItems);
    newList.splice(idx, 1);
    setListItems(newList);
  };

  const saveItems = () => {
    axios.post("/items/save", { items: listItems });
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h2" style={{ textAlign: "center" }}>
          List of things
        </Typography>
      </Grid>
      <List
        style={{
          width: "25%",
          margin: "auto",
          marginTop: 25,
        }}
      >
        {listItems.map((item, idx) => {
          return (
            <ListItem style={{ border: "black 1px solid", marginTop: 5 }}>
              <TextField
                value={item}
                onChange={(event) => {
                  changeItem(idx, event);
                }}
              />
              <ListItemSecondaryAction>
                <Button
                  color="secondary"
                  onClick={() => {
                    deleteItem(idx);
                  }}
                >
                  DELETE
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 25 }}
      >
        <Button style={{ marginRight: 50 }} onClick={createNewItem}>
          CREATE NEW
        </Button>
        <Button color="primary" variant="contained" onClick={saveItems}>
          SAVE
        </Button>
      </Grid>
    </Grid>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
