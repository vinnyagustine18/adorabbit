import { ActivityIndicator } from 'react-native-paper';
import { View } from './themed';
import { StyleSheet } from 'react-native';

interface Props {
  isLoading: boolean;
}

export default function LoadingViewOverlay(props: Props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.overlay}>
        <ActivityIndicator color={'FFFFFF'} />
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000050',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});
