import { View, ActivityIndicator } from 'react-native' // ✅ import from 'react-native'

const Loading = ({ loader }) => {
    if (!loader) return null; // ← hides when not loading

    return (
        <View style={{ paddingTop: 12, }}>
            <ActivityIndicator size="large" color="#E53935" />
        </View>
    );
};

export default Loading;