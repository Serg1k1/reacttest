import { useEffect, useState, useCallback } from "react";
import { useEventStore } from "../store";
import { fetchEvents } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Button, FlatList, Text } from "react-native";

const EventListScreen = () => {
    const { events, setEvents, timer, incrementTimer, resetTimer } = useEventStore();
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const fetchData = useCallback(async () => {
        const data = await fetchEvents();

        setEvents(data);
    }, [setEvents])

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            incrementTimer();
        }, 60000)

        return () => clearInterval(interval)
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    const navigateToDetails = (event) => {
        resetTimer();
        navigation.navigate("EventDetails", { event });
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigateToDetails(item)}>
                <View style={{ padding: 10 }}>
                    <Text>{item.type}</Text>
                    <Text>{item.actor.login}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <Button title="refresh" onPress={onRefresh} />
            <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />

        </View>
    )
}

export default EventListScreen;