import { useNavigation } from "@react-navigation/native";
import { useEventStore } from "../store";
import { View, Text, Button } from "react-native";

const EventDetailsScreen = ({ route }) => {
    const { event } = route.params;
    const { resetTimer } = useEventStore();
    const navigation = useNavigation();

    const goBack = () => {
        resetTimer();
        navigation.goBack();
    }
    return (
        <View>
            <Text>Type: {event.type}</Text>
            <Text>Actor: {event.actor.login}</Text>
            <Button title="Back" onPress={goBack} />
        </View>
    )
}

export default EventDetailsScreen