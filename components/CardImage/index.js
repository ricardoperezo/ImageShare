import * as React from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { useStyles } from "./styles";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const CardImage = (props) => {
  const { title, description, selectedImage, handleShare, handleCancel } =
    props;
  const classes = useStyles;

  return (
    <Card>
      <Card.Title title={title} subtitle={description} left={LeftContent} />
      <Card.Cover
        source={{ uri: selectedImage.localUri }}
        style={classes.thumbnail}
      />
      <Card.Actions style={classes.actions}>
        <Button onPress={handleShare}>Share</Button>
        <Button onPress={handleCancel}>Cancel</Button>
      </Card.Actions>
    </Card>
  );
};

export default CardImage;
