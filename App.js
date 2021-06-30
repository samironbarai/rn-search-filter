import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, FlatList, StyleSheet } from "react-native";
import SearchComponent from "./src/components/SearchComponent";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");
  const [term, setTerm] = useState("");

  const getPosts = (t) => {
    axios.get(`https://yourwebsite.com/api/posts?term=${t}`).then((res) => {
      if (res.data.length > 0) {
        setPosts(res.data);
      } else {
        setPosts([]);
        setErr("No post found");
      }
    });
  };

  const renderPosts = ({ item }) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <Text style={styles.itemTitleStyle}>{item.id}. {item.title}</Text>
        <Text style={styles.itemBodyStyle}>{item.body}</Text>
      </View>
    );
  };

  useEffect(() => {
    getPosts(term);
  }, [term]);

  return (
    <>
      <StatusBar backgroundColor="#00876C" />
      <View>
        <SearchComponent onSearchEnter={(newTerm) => {
          setTerm(newTerm);
          setErr("");
        }} />

        {err ?
          <Text style={styles.errStyle}>{err}</Text>
          :
          <FlatList
            data={posts}
            renderItem={renderPosts}
            keyExtractor={post => post.id}
          />
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderColor: "#ccc",
    paddingHorizontal: 16,
  },
  itemTitleStyle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  itemBodyStyle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  errStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "red",
  },
});

export default App;
