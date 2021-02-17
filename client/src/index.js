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
  const [listItems, setListItems] = useState([]);

  const getItems = () => {
    axios.get("/items/list").then((resp) => {
      setListItems(resp.data);
    });
  };

  useEffect(() => {
    //Fetch list items
    getItems();
  }, []);

  const changeItem = (idx, event) => {
    let newList = Array.from(listItems);
    newList[idx].name = event.target.value;
    setListItems(newList);
  };

  const deleteItem = async (idx) => {
    await axios.delete("/items/delete", { data: listItems[idx] }); //pass whole object to verify it hasn't been changed since last pulled updates so you don't delete others work
    getItems();
  };

  const saveItem = async (idx) => {
    await axios.post("/items/update", listItems[idx]);
    getItems();
  };

  const createItem = async () => {
    console.log("Creating item");
    await axios.post("/items/create");
    getItems();
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
                value={item.name}
                onChange={(event) => {
                  changeItem(idx, event);
                }}
                onBlur={() => {
                  saveItem(idx);
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
        <Button style={{ marginRight: 50 }} onClick={createItem}>
          CREATE NEW
        </Button>
      </Grid>
    </Grid>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
