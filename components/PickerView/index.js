import * as React from "react";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useStyles } from "./styles";

const PickerView = (props) => {
  const { handlePicker } = props;
  const classes = useStyles;

  return (
    <Card>
      <Card.Content>
        <Title>Image Picker</Title>
        <Paragraph style={classes.paragraph}>
          To share a photo from your phone with a friend, just press the button
          below!
        </Paragraph>
      </Card.Content>
      <Card.Actions style={classes.actions}>
        <Button
          onPress={handlePicker}
          mode={"contained"}
          style={classes.button}
        >
          Browse
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default PickerView;
